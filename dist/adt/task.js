import { Left, Right } from "./either.js";
/** Main constructor */
export const Task = (run0) => ({
    run: () => run0(),
    runWith: (signal) => run0(signal),
    map: (f) => Task((signal) => run0(signal).then((ea) => ea._tag === "Right" ? Right(f(ea.right)) : ea)),
    chain: (f) => Task((signal) => run0(signal).then((ea) => ea._tag === "Right"
        ? f(ea.right).runWith(signal)
        : Promise.resolve(ea))),
    ap: (fb) => Task((signal) => fb
        .runWith(signal)
        .then((ef) => ef._tag === "Right"
        ? run0(signal).then((ea) => ea._tag === "Right"
            ? Right(ef.right(ea.right))
            : ea)
        : Promise.resolve(ef))),
    mapError: (f) => Task((signal) => run0(signal).then((ea) => ea._tag === "Left" ? Left(f(ea.left)) : ea)),
    bimap: (onError, onSuccess) => Task((signal) => run0(signal).then((ea) => ea._tag === "Left"
        ? Left(onError(ea.left))
        : Right(onSuccess(ea.right)))),
});
/** Simple constructors */
Task.of = (a) => Task(() => Promise.resolve(Right(a)));
Task.reject = (e) => Task(() => Promise.resolve(Left(e)));
/** Abort-aware helper (NOT attached as static to Task to avoid type noise) */
export const taskFromAbortable = (register, onError) => Task((signal) => {
    const controller = signal === undefined ? new AbortController() : null;
    const effectiveSignal = signal ?? controller.signal;
    return register(effectiveSignal)
        .then((a) => Right(a))
        .catch((e) => Left(onError(e)));
});
/** Utilities */
Task.tryCatch = (f) => Task(() => f().then(Right).catch(Left));
Task.tryCatchK = (f, onError) => Task(() => f()
    .then(Right)
    .catch((e) => Left(onError(e))));
/** Point-free combinators */
Task.map =
    (f) => (t) => t.map(f);
Task.chain =
    (f) => (t) => t.chain(f);
Task.ap =
    (fb) => (fa) => fa.ap(fb);
Task.mapError =
    (f) => (t) => t.mapError(f);
Task.bimap =
    (onError, onSuccess) => (t) => t.bimap(onError, onSuccess);
/** Fold - consume the Task */
Task.fold =
    (onError, onSuccess) => (t) => t
        .run()
        .then((ea) => ea._tag === "Left" ? onError(ea.left) : onSuccess(ea.right));
/** Get Right or default */
Task.getOrElse =
    (defaultValue) => (t) => t.run().then((ea) => (ea._tag === "Right" ? ea.right : defaultValue));
/** Delay execution (abort-safe wrapper) */
Task.delay =
    (ms) => (t) => Task((signal) => new Promise((resolve) => {
        const id = setTimeout(() => {
            t.runWith(signal).then(resolve);
        }, ms);
        if (signal) {
            signal.addEventListener("abort", () => {
                clearTimeout(id);
                // Resolve with a Left on abort so the Task always settles.
                const abortError = {
                    message: "Task.delay aborted",
                };
                resolve(Left(abortError));
            }, { once: true });
        }
    }));
/** Timeout a task */
Task.timeout =
    (ms, onTimeout) => (t) => Task((signal) => new Promise((resolve) => {
        const timeoutId = setTimeout(() => resolve(Left(onTimeout)), ms);
        const runPromise = t.runWith(signal).then((ea) => {
            clearTimeout(timeoutId);
            resolve(ea);
        });
        if (signal) {
            signal.addEventListener("abort", () => {
                clearTimeout(timeoutId);
            });
        }
        return runPromise;
    }));
/** Sequence an array of Tasks (sequential execution) */
Task.sequence = (tasks) => Task((signal) => (async () => {
    const results = [];
    for (const task of tasks) {
        const ea = await task.runWith(signal);
        if (ea._tag === "Left")
            return ea;
        results.push(ea.right);
    }
    return Right(results);
})());
/** Traverse an array */
Task.traverse =
    (f) => (arr) => Task.sequence(arr.map(f));
/** Parallel execution - all tasks must succeed */
Task.all = (tasks) => Task((signal) => Promise.all(tasks.map((t) => t.runWith(signal))).then((results) => {
    const values = [];
    for (const ea of results) {
        if (ea._tag === "Left")
            return ea;
        values.push(ea.right);
    }
    return Right(values);
}));
/** Race - return first to complete */
Task.race = (tasks) => Task((signal) => Promise.race(tasks.map((t) => t.runWith(signal))));
/** From Either */
Task.fromEither = (e) => Task(() => Promise.resolve(e));
/** Convert to Promise (unsafe - throws on Left) */
Task.toPromise = (t) => t.run().then((ea) => {
    if (ea._tag === "Left")
        throw ea.left;
    return ea.right;
});
export default Task;
//# sourceMappingURL=task.js.map