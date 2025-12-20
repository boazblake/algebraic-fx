// src/adt/id.ts
import { fl } from "./fl.js";
const makeID = (a) => {
    const self = {
        _tag: "ID",
        value: a,
        run: () => a,
        map(f) {
            return makeID(f(a));
        },
        chain(f) {
            return f(a);
        },
        ap(fab) {
            return makeID(fab.value(a));
        },
        [fl.map]: undefined,
        [fl.chain]: undefined,
        [fl.ap]: undefined,
    };
    // Bind FL methods to the instance methods (no `any` intersection issues once fl keys are unique)
    self[fl.map] = self.map;
    self[fl.chain] = self.chain;
    self[fl.ap] = self.ap;
    return self;
};
export const of = (a) => makeID(a);
export const map = (f) => (fa) => fa[fl.map](f);
export const chain = (f) => (fa) => fa[fl.chain](f);
export const ap = (fab) => (fa) => fa[fl.ap](fab);
export const isID = (u) => !!u &&
    typeof u === "object" &&
    u._tag === "ID" &&
    typeof u.run === "function";
// fp-ts style dictionary
export const IDModule = {
    URI: "ID",
    of,
    map: (fa, f) => map(f)(fa),
    chain: (fa, f) => chain(f)(fa),
    ap: (fab, fa) => ap(fab)(fa),
    isID,
    [fl.of]: (a) => of(a),
    [fl.map]: (f) => (fa) => map(f)(fa),
    [fl.chain]: (f) => (fa) => chain(f)(fa),
    [fl.ap]: (fab) => (fa) => ap(fab)(fa),
};
//# sourceMappingURL=id.js.map