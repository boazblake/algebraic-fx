/**
 * Unique nominal brand for IO values.
 * Ensures IO cannot be confused with plain objects.
 */
declare const IOBrand: unique symbol;

/**
 * IO<A> represents a *lazy*, *purely described* effect that produces a value of type A.
 *
 * IO does not execute until `.run()` is called.
 *
 * Characteristics:
 * - Lazy by default (no side effects until explicitly run)
 * - Referentially transparent (IO(() => x) always describes the same effect)
 * - Composable with map, chain, and ap
 *
 * Equivalent to:
 *     IO<A> ≅ () => A
 *
 * @typeParam A The produced value type
 */
export type IO<A> = {
  readonly [IOBrand]: true;

  /** Execute the effect and return the value. */
  run: () => A;

  /** Functor map: transform the result of running the IO. */
  map: <B>(f: (a: A) => B) => IO<B>;

  /**
   * Monad chain / flatMap:
   * Feed the result into another IO-producing function.
   *
   * IO(() => a).chain(x => IO(() => f(x)))
   */
  chain: <B>(f: (a: A) => IO<B>) => IO<B>;

  /**
   * Applicative apply:
   * Apply an IO that produces a function to an IO that produces a value.
   */
  ap: <B>(fb: IO<(a: A) => B>) => IO<B>;
};

/**
 * Construct a new lazy IO effect.
 *
 * @param run A function describing the effect
 */
export const IO = <A>(run: () => A): IO<A> => ({
  [IOBrand]: true,
  run,

  map: (f) => IO(() => f(run())),

  chain: (f) => IO(() => f(run()).run()),

  ap: (fb) => IO(() => fb.run()(run())),
});

/**
 * Lift a pure value into an IO, producing it when run().
 */
IO.of = <A>(a: A): IO<A> => IO(() => a);

/**
 * Point-free functor map.
 */
IO.map =
  <A, B>(f: (a: A) => B) =>
  (io: IO<A>): IO<B> =>
    io.map(f);

/**
 * Point-free monadic chain.
 */
IO.chain =
  <A, B>(f: (a: A) => IO<B>) =>
  (io: IO<A>): IO<B> =>
    io.chain(f);

/**
 * Point-free applicative apply.
 */
IO.ap =
  <A, B>(fb: IO<(a: A) => B>) =>
  (fa: IO<A>): IO<B> =>
    fa.ap(fb);

/**
 * Execute an IO and extract its value.
 */
IO.run = <A>(io: IO<A>): A => io.run();

/**
 * Sequence an array of IO computations into a single IO that,
 * when run, returns an array of all results.
 */
IO.sequence = <A>(ios: IO<A>[]): IO<A[]> => IO(() => ios.map((io) => io.run()));

/**
 * Traverse an array using a function returning IO.
 * Equivalent to: IO.sequence(arr.map(f))
 */
IO.traverse =
  <A, B>(f: (a: A) => IO<B>) =>
  (arr: A[]): IO<B[]> =>
    IO(() => arr.map((a) => f(a).run()));

/**
 * Try-catch wrapper:
 * Safely execute a synchronous effect, mapping thrown errors.
 *
 * @param f Function that may throw
 * @param onError Recovery handler mapping unknown errors into A
 */
IO.tryCatch = <A>(f: () => A, onError: (e: unknown) => A): IO<A> =>
  IO(() => {
    try {
      return f();
    } catch (e) {
      return onError(e);
    }
  });

/**
 * Default export for convenience.
 */
export default IO;
