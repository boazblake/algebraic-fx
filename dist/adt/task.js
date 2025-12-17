// src/adt/task.ts
import { fl } from "./fl.js";
import { left, right } from "./either.js";
/**
 * Internal constructor that wires up FL methods using `this`.
 */
const makeTask = (run) => {
    const self = {
        _tag: "Task",
        run,
        runWith(onError, onSuccess) {
            return this.run().then((ea) => ea._tag === "Left" ? onError(ea.left) : onSuccess(ea.right));
        },
        [fl.map](f) {
            return makeTask(() => this.run().then((ea) => ea._tag === "Left" ? ea : right(f(ea.right))));
        },
        [fl.chain](f) {
            return makeTask(() => this.run().then((ea) => ea._tag === "Left" ? ea : f(ea.right).run()));
        },
        /**
         * Instance ap: valueTask.ap(functionTask)
         *
         * This matches how the tests use it:
         *   value[fl.ap](functionTask)
         */
        [fl.ap](fab) {
            return makeTask(() => Promise.all([fab.run(), this.run()]).then(([ef, ea]) => {
                if (ef._tag === "Left")
                    return ef;
                if (ea._tag === "Left")
                    return ea;
                return right(ef.right(ea.right));
            }));
        },
    };
    return self;
};
/* ========================================================================== */
/* Module-level helpers                                                       */
/* ========================================================================== */
export const TaskModule = {
    of(a) {
        return makeTask(() => Promise.resolve(right(a)));
    },
    fail(e) {
        return makeTask(() => Promise.resolve(left(e)));
    },
    map(f) {
        return (fa) => fa[fl.map](f);
    },
    chain(f) {
        return (fa) => fa[fl.chain](f);
    },
    /**
     * Applicative ap:
     *   ap(tf)(tv) ≡ tv.ap(tf)
     * where tf: Task<E, (a: A) => B>, tv: Task<E, A>.
     */
    ap(tf) {
        return (tv) => tv[fl.ap](tf);
    },
    fromIO(io) {
        return makeTask(() => Promise.resolve(right(io.run())));
    },
    fromEither(ea) {
        return makeTask(() => Promise.resolve(ea));
    },
    fromPromise(thunk, onError) {
        return makeTask(() => thunk().then((a) => right(a), (e) => left(onError(e))));
    },
    tryCatch(thunk, onError) {
        return makeTask(() => {
            try {
                const a = thunk();
                return Promise.resolve(right(a));
            }
            catch (e) {
                return Promise.resolve(left(onError(e)));
            }
        });
    },
    isTask(u) {
        return (!!u &&
            typeof u === "object" &&
            typeof u.run === "function" &&
            typeof u.runWith === "function" &&
            u._tag === "Task");
    },
    // Fantasy-Land constructor-level helpers (rarely used, but fine to expose)
    [fl.of](a) {
        return TaskModule.of(a);
    },
    [fl.map](f) {
        return (fa) => TaskModule.map(f)(fa);
    },
    [fl.chain](f) {
        return (fa) => TaskModule.chain(f)(fa);
    },
    [fl.ap](tf) {
        return (tv) => TaskModule.ap(tf)(tv);
    },
};
/* ========================================================================== */
/* Top-level exports used by tests                                            */
/* ========================================================================== */
export const of = TaskModule.of;
export const fail = TaskModule.fail;
export const map = TaskModule.map;
export const chain = TaskModule.chain;
export const ap = TaskModule.ap;
export const fromIO = TaskModule.fromIO;
export const fromEither = TaskModule.fromEither;
export const fromPromise = TaskModule.fromPromise;
export const tryCatch = TaskModule.tryCatch;
export const isTask = TaskModule.isTask;
//# sourceMappingURL=task.js.map