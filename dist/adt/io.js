// src/adt/io.ts
import { fl } from "./fl.js";
export const IO_URI = "IO";
const makeIO = (run) => {
    const self = {
        _tag: "IO",
        run,
        [fl.map](f) {
            return makeIO(() => f(run()));
        },
        [fl.chain](f) {
            return makeIO(() => f(run()).run());
        },
        [fl.ap](fa) {
            return makeIO(() => this.run()(fa.run()));
        },
    };
    return self;
};
// public constructor
export const IO = (thunk) => makeIO(thunk);
// fp-style helpers implemented via run, not via FL symbols
export const of = (a) => makeIO(() => a);
export const map = (f) => (fa) => IO(() => f(fa.run()));
export const chain = (f) => (fa) => IO(() => f(fa.run()).run());
export const ap = (fab) => (fa) => IO(() => fab.run()(fa.run()));
export const isIO = (u) => typeof u === "object" &&
    u !== null &&
    u._tag === "IO" &&
    typeof u.run === "function";
export const fromThunk = (thunk) => IO(thunk);
export const toThunk = (io) => io.run;
// fp-ts-style module
export const ioModule = {
    URI: IO_URI,
    of,
    map: (fa, f) => map(f)(fa),
    ap: (fab, fa) => ap(fab)(fa),
    chain: (fa, f) => chain(f)(fa),
    [fl.of]: of,
};
//# sourceMappingURL=io.js.map