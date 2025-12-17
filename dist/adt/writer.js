// src/adt/writer.ts
import { fl } from "./fl.js";
const WRITER_MONOID = Symbol("WriterMonoid");
const makeWriter = (m, run) => {
    const self = {
        run,
        [WRITER_MONOID]: m,
        [fl.map](f) {
            return map(self, f);
        },
        [fl.chain](f) {
            return chain(self, f);
        },
        [fl.ap](wf) {
            return ap(wf, self);
        },
    };
    return self;
};
/**
 * of: construct a Writer with value and optional initial log.
 * If log is omitted, uses the monoid empty.
 */
export const of = (m, a, w) => makeWriter(m, () => [a, w ?? m.empty]);
/**
 * tell: append a log value, with void result.
 */
export const tell = (m, w) => makeWriter(m, () => [undefined, w]);
/**
 * map: transform the value, keep the same log.
 */
export const map = (wa, f) => {
    const wi = wa;
    const m = wi[WRITER_MONOID];
    const [a, w] = wi.run();
    return makeWriter(m, () => [f(a), w]);
};
/**
 * chain: sequence computations and combine logs via the monoid.
 */
export const chain = (wa, f) => {
    const wi = wa;
    const m = wi[WRITER_MONOID];
    const [a, w1] = wi.run();
    const [b, w2] = f(a).run();
    return makeWriter(m, () => [b, m.concat(w1, w2)]);
};
/**
 * ap: apply a Writer<W, (a -> b)> to a Writer<W, a>, combining logs.
 */
export const ap = (wf, wa) => {
    const wfI = wf;
    const waI = wa;
    const m = wfI[WRITER_MONOID];
    const [g, w1] = wfI.run();
    const [a, w2] = waI.run();
    return makeWriter(m, () => [g(a), m.concat(w1, w2)]);
};
/**
 * listen: produce [value, log] as value, keep same log.
 */
export const listen = (wa) => {
    const [a, w] = wa.run();
    return {
        run: () => [[a, w], w],
    };
};
/**
 * Narrow type guard.
 */
export const isWriter = (u) => !!u && typeof u === "object" && typeof u.run === "function";
/**
 * fp-ts style module dictionary for a fixed monoid W.
 */
export const WriterModule = (m) => {
    const ofM = (a, w) => of(m, a, w);
    const mapM = (wa, f) => map(wa, f);
    const chainM = (wa, f) => chain(wa, f);
    const apM = (wf, wa) => ap(wf, wa);
    const tellM = (w) => tell(m, w);
    const listenM = listen;
    const module = {
        of: ofM,
        map: mapM,
        chain: chainM,
        ap: apM,
        tell: tellM,
        listen: listenM,
        isWriter,
        [fl.of]: ofM,
    };
    return module;
};
//# sourceMappingURL=writer.js.map