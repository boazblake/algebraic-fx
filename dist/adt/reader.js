// src/adt/reader.ts
import { fl } from "./fl.js";
// ======================================================
// Internal constructor
// ======================================================
const makeReader = (run) => {
    const self = {
        _tag: "Reader",
        run,
        map(f) {
            return makeReader((r) => f(run(r)));
        },
        chain(f) {
            return makeReader((r) => f(run(r)).run(r));
        },
        ap(fa) {
            return makeReader((r) => this.run(r)(fa.run(r)));
        },
        [fl.map](f) {
            return this.map(f);
        },
        [fl.chain](f) {
            return this.chain(f);
        },
        [fl.ap](fa) {
            return this.ap(fa);
        },
    };
    return self;
};
// ======================================================
// Public constructors: of / ask / asks
// ======================================================
export const of = (a) => makeReader(() => a);
export const ask = () => makeReader((r) => r);
export const asks = (f) => makeReader((r) => f(r));
// ======================================================
// Exported Reader value (with static helpers)
// ======================================================
export const Reader = Object.assign((run) => makeReader(run), {
    of,
    ask,
    asks,
});
// ======================================================
// Type guard
// ======================================================
export const isReader = (u) => !!u &&
    typeof u === "object" &&
    u._tag === "Reader" &&
    typeof u.run === "function";
// ======================================================
// fp-ts style helpers
// ======================================================
export const map = (f) => (fa) => fa.map(f);
export const chain = (f) => (fa) => fa.chain(f);
export const ap = (fab) => (fa) => fab.ap(fa);
// ======================================================
// ReaderModule (used by tests)
// ======================================================
export const ReaderModule = {
    URI: "Reader",
    of,
    map: (fa, f) => fa.map(f),
    chain: (fa, f) => fa.chain(f),
    ap: (fab, fa) => fab.ap(fa),
    [fl.of]: of,
};
//# sourceMappingURL=reader.js.map