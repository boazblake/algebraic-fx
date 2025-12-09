/**
 * Unique brand for nominal typing of Task values.
 * Prevents structural type collisions with plain objects.
 */
const TaskBrand = Symbol("TaskBrand");
import { Left, Right } from "./either.js";
/**
 * Construct a Task given a function that accepts an optional AbortSignal.
 *
 * The returned Task is lazy and will not run until `.run()` or `.runWith(signal)` is called.
 *
 * @param run0 Underlying async function returning `Either<E, A>`
 */
export const Task = (run0) => ({
    [TaskBrand]: true,
    run: () => run0(),
    runWith: (signal) => {
        if (signal === undefined || signal === null) {
            throw new Error("Task.runWith requires an AbortSignal. Use run() if cancellation is not needed.");
        }
        return run0(signal);
    },
    map: (f) => Task((signal) => run0(signal).then((ea) => ea._tag === "Right" ? Right(f(ea.right)) : ea)),
    chain: (f) => Task((signal) => run0(signal).then((ea) => {
        if (ea._tag === "Right") {
            const nextTask = f(ea.right);
            // CORRECTED: Check if signal exists before using runWith
            return signal !== undefined
                ? nextTask.runWith(signal)
                : nextTask.run();
        }
        return Promise.resolve(ea);
    })),
    ap: (fb) => Task((signal) => {
        // CORRECTED: Check if signal exists before using runWith
        const fbPromise = signal !== undefined ? fb.runWith(signal) : fb.run();
        return fbPromise.then((ef) => {
            if (ef._tag === "Left") {
                return Promise.resolve(ef);
            }
            // CORRECTED: Check if signal exists before using runWith
            const faPromise = signal !== undefined ? run0(signal) : run0();
            return faPromise.then((ea) => ea._tag === "Right"
                ? Right(ef.right(ea.right))
                : ea);
        });
    }),
    mapError: (f) => Task((signal) => run0(signal).then((ea) => ea._tag === "Left" ? Left(f(ea.left)) : ea)),
    bimap: (onError, onSuccess) => Task((signal) => run0(signal).then((ea) => ea._tag === "Left"
        ? Left(onError(ea.left))
        : Right(onSuccess(ea.right)))),
});
/**
 * Lift a value into a successful Task.
 */
Task.of = (a) => Task(() => Promise.resolve(Right(a)));
/**
 * Construct a failing Task.
 */
Task.reject = (e) => Task(() => Promise.resolve(Left(e)));
/**
 * Wrap an abort-aware async registration function into a Task.
 *
 * @param register Function that takes an AbortSignal and returns a Promise<A>
 * @param onError Map unknown errors into E
 */
Task.fromAbortable = (register, onError) => Task((signal) => {
    const controller = signal === undefined ? new AbortController() : null;
    const effectiveSignal = signal ?? controller.signal;
    return register(effectiveSignal)
        .then((a) => Right(a))
        .catch((e) => Left(onError(e)));
});
/**
 * Wrap a Promise-returning function into a Task that catches errors.
 */
Task.tryCatch = (f) => Task(() => f().then(Right).catch(Left));
/**
 * tryCatch with custom error mapping.
 */
Task.tryCatchK = (f, onError) => Task(() => f()
    .then(Right)
    .catch((e) => Left(onError(e))));
/** Point-free map. */
Task.map =
    (f) => (t) => t.map(f);
/** Point-free chain. */
Task.chain =
    (f) => (t) => t.chain(f);
/** Point-free ap. */
Task.ap =
    (fb) => (fa) => fa.ap(fb);
/** Point-free mapError. */
Task.mapError =
    (f) => (t) => t.mapError(f);
/** Point-free bimap. */
Task.bimap =
    (onError, onSuccess) => (t) => t.bimap(onError, onSuccess);
/**
 * Consume a Task by converting its Either result into the final pure value.
 */
Task.fold =
    (onError, onSuccess) => (t) => t
        .run()
        .then((ea) => ea._tag === "Left" ? onError(ea.left) : onSuccess(ea.right));
/**
 * Extract the success value with a default fallback.
 */
Task.getOrElse =
    (defaultValue) => (t) => t.run().then((ea) => (ea._tag === "Right" ? ea.right : defaultValue));
/**
 * Delay a Task's execution by N milliseconds (abort-aware).
 */
Task.delay =
    (ms) => (t) => Task((signal) => new Promise((resolve) => {
        const id = setTimeout(() => {
            // CORRECTED: Check if signal exists before using runWith
            if (signal !== undefined) {
                t.runWith(signal).then(resolve);
            }
            else {
                t.run().then(resolve);
            }
        }, ms);
        if (signal) {
            signal.addEventListener("abort", () => {
                clearTimeout(id);
                const abortError = {
                    message: "Task.delay aborted",
                };
                resolve(Left(abortError));
            }, { once: true });
        }
    }));
/**
 * Timeout a Task after N ms, returning a Left(onTimeout).
 */
Task.timeout =
    (ms, onTimeout) => (t) => Task((signal) => new Promise((resolve) => {
        const timeoutId = setTimeout(() => resolve(Left(onTimeout)), ms);
        // CORRECTED: Check if signal exists before using runWith
        const taskPromise = signal !== undefined ? t.runWith(signal) : t.run();
        taskPromise.then((ea) => {
            clearTimeout(timeoutId);
            resolve(ea);
        });
        if (signal) {
            signal.addEventListener("abort", () => {
                clearTimeout(timeoutId);
            });
        }
    }));
/**
 * Execute Tasks sequentially, short-circuiting on Failure.
 */
Task.sequence = (tasks) => Task((signal) => (async () => {
    const results = [];
    for (const task of tasks) {
        // CORRECTED: Check if signal exists before using runWith
        const ea = signal !== undefined ? await task.runWith(signal) : await task.run();
        if (ea._tag === "Left")
            return ea;
        results.push(ea.right);
    }
    return Right(results);
})());
/**
 * Traverse an array by mapping each element to a Task and sequencing.
 */
Task.traverse =
    (f) => (arr) => Task.sequence(arr.map(f));
/**
 * Run all Tasks in parallel.
 * Fails fast if any task fails.
 */
Task.all = (tasks) => Task((signal) => {
    // CORRECTED: Check if signal exists before using runWith
    const promises = signal !== undefined
        ? tasks.map((t) => t.runWith(signal))
        : tasks.map((t) => t.run());
    return Promise.all(promises).then((results) => {
        const values = [];
        for (const ea of results) {
            if (ea._tag === "Left")
                return ea;
            values.push(ea.right);
        }
        return Right(values);
    });
});
/**
 * Race multiple Tasks, resolving with the first to finish.
 */
Task.race = (tasks) => Task((signal) => {
    // CORRECTED: Check if signal exists before using runWith
    const promises = signal !== undefined
        ? tasks.map((t) => t.runWith(signal))
        : tasks.map((t) => t.run());
    return Promise.race(promises);
});
/**
 * Lift an Either into a Task.
 */
Task.fromEither = (e) => Task(() => Promise.resolve(e));
/**
 * Convert a Task into a Promise that throws on Left.
 */
Task.toPromise = (t) => t.run().then((ea) => {
    if (ea._tag === "Left")
        throw ea.left;
    return ea.right;
});
export default Task;
//# sourceMappingURL=task.js.map