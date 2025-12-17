import { fl } from "./fl.js";
const make = (run) => {
    const self = {
        _tag: "State",
        run,
        [fl.map](f) {
            return make((s) => {
                const [a, s2] = self.run(s);
                return [f(a), s2];
            });
        },
        [fl.chain](f) {
            return make((s) => {
                const [a, s2] = self.run(s);
                return f(a).run(s2);
            });
        },
        [fl.ap](sf) {
            return make((s) => {
                const [fn, s2] = sf.run(s);
                const [a, s3] = self.run(s2);
                return [fn(a), s3];
            });
        },
    };
    return self;
};
export const of = (a) => make((s) => [a, s]);
export const map = (f) => (sa) => make((s) => {
    const [a, s2] = sa.run(s);
    return [f(a), s2];
});
export const chain = (f) => (sa) => make((s) => {
    const [a, s2] = sa.run(s);
    return f(a).run(s2);
});
export const ap = (sf) => (sa) => make((s) => {
    const [fn, s2] = sf.run(s);
    const [a, s3] = sa.run(s2);
    return [fn(a), s3];
});
export const get = () => make((s) => [s, s]);
export const put = (s) => make(() => [undefined, s]);
export const modify = (f) => make((s) => [undefined, f(s)]);
export const evalState = (sa, s) => sa.run(s)[0];
export const execState = (sa, s) => sa.run(s)[1];
export const isState = (u) => !!u && typeof u === "object" && typeof u.run === "function";
export const StateModule = {
    URI: "State",
    of,
    map,
    chain,
    ap,
    get,
    put,
    modify,
    evalState,
    execState,
    isState,
    [fl.of]: of,
    [fl.map]: (f) => (sa) => map(f)(sa),
    [fl.chain]: (f) => (sa) => chain(f)(sa),
    [fl.ap]: (sf) => (sa) => ap(sf)(sa),
};
//# sourceMappingURL=state.js.map