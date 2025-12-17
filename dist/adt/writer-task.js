import { TaskModule } from "./task.js";
export const makeWriterTask = (runTask, m) => ({
    runTask,
    monoid: m,
});
export const of = (m, a, w) => {
    const initial = [a, w ?? m.empty];
    const task = TaskModule.of(initial);
    return makeWriterTask(task, m);
};
export const tell = (m, w) => {
    const initial = [undefined, w];
    const task = TaskModule.of(initial);
    return makeWriterTask(task, m);
};
export const map = (wa, f) => {
    const m = wa.monoid;
    const mapped = TaskModule.map(([a, w]) => [f(a), w])(wa.runTask);
    return makeWriterTask(mapped, m);
};
export const chain = (wa, f) => {
    const m = wa.monoid;
    const chained = TaskModule.chain(([a, w1]) => {
        const wb = f(a);
        const tb = wb.runTask;
        return TaskModule.map(([b, w2]) => [
            b,
            m.concat(w1, w2),
        ])(tb);
    })(wa.runTask);
    return makeWriterTask(chained, m);
};
export const ap = (wf, wa) => {
    const m = wf.monoid;
    const applied = TaskModule.chain(([g, w1]) => TaskModule.map(([a, w2]) => [g(a), m.concat(w1, w2)])(wa.runTask))(wf.runTask);
    return makeWriterTask(applied, m);
};
export const liftTask = (m, t) => {
    const lifted = TaskModule.map((a) => [a, m.empty])(t);
    return makeWriterTask(lifted, m);
};
export const isWriterTask = (u) => !!u &&
    typeof u === "object" &&
    "runTask" in u &&
    TaskModule.isTask(u.runTask);
export const WriterTaskModule = (m) => ({
    of: (a, w) => of(m, a, w),
    map: (wa, f) => map(wa, f),
    chain: (wa, f) => chain(wa, f),
    ap: (wf, wa) => ap(wf, wa),
    tell: (w) => tell(m, w),
    liftTask: (t) => liftTask(m, t),
    isWriterTask,
});
//# sourceMappingURL=writer-task.js.map