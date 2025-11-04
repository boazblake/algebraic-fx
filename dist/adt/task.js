import { Left, Right } from "./either";
/** Main constructor */
export const Task = (run) => ({
    run,
    map: (f) => Task(() => run().then((ea) => (ea._tag === "Right" ? Right(f(ea.right)) : ea))),
    chain: (f) => Task(() => run().then((ea) => ea._tag === "Right" ? f(ea.right).run() : Promise.resolve(ea))),
});
/** Static constructors */
Task.of = (a) => Task(() => Promise.resolve(Right(a)));
Task.reject = (e) => Task(() => Promise.resolve(Left(e)));
/** Utilities */
Task.tryCatch = (f) => Task(() => f().then(Right).catch(Left));
export default Task;
