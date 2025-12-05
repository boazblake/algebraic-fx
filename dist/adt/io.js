/**
 * Unique nominal brand for IO values.
 * Ensures IO cannot be confused with plain objects.
 */
const IOBrand = Symbol("IOBrand");
/**
 * Construct a new lazy IO effect.
 *
 * @param run A function describing the effect
 */
export const IO = (run) => ({
    [IOBrand]: true,
    run,
    map: (f) => IO(() => f(run())),
    chain: (f) => IO(() => f(run()).run()),
    ap: (fb) => IO(() => fb.run()(run())),
});
/**
 * Lift a pure value into an IO, producing it when run().
 */
IO.of = (a) => IO(() => a);
/**
 * Point-free functor map.
 */
IO.map =
    (f) => (io) => io.map(f);
/**
 * Point-free monadic chain.
 */
IO.chain =
    (f) => (io) => io.chain(f);
/**
 * Point-free applicative apply.
 */
IO.ap =
    (fb) => (fa) => fa.ap(fb);
/**
 * Execute an IO and extract its value.
 */
IO.run = (io) => io.run();
/**
 * Sequence an array of IO computations into a single IO that,
 * when run, returns an array of all results.
 */
IO.sequence = (ios) => IO(() => ios.map((io) => io.run()));
/**
 * Traverse an array using a function returning IO.
 * Equivalent to: IO.sequence(arr.map(f))
 */
IO.traverse =
    (f) => (arr) => IO(() => arr.map((a) => f(a).run()));
/**
 * Try-catch wrapper:
 * Safely execute a synchronous effect, mapping thrown errors.
 *
 * @param f Function that may throw
 * @param onError Recovery handler mapping unknown errors into A
 */
IO.tryCatch = (f, onError) => IO(() => {
    try {
        return f();
    }
    catch (e) {
        return onError(e);
    }
});
/**
 * Default export for convenience.
 */
export default IO;
//# sourceMappingURL=io.js.map