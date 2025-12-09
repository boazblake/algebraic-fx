// tests/adt.state.laws.test.ts
import { describe, it, expect } from "vitest";
import fc from "fast-check";
import StateModule, { type State as StateT } from "../src/adt/state.ts";

const State = StateModule;

type S = number;
type A = number;

const arbStateNumber: fc.Arbitrary<StateT<S, A>> = fc
  .func<S, [A, S]>(
    fc.tuple(fc.integer(), fc.integer()) // [value, newState]
  )
  .map((f) => State<S, A>((s) => f(s)));

const eqState = (x: StateT<S, A>, y: StateT<S, A>, s: S): boolean => {
  const [vx, sx] = x.run(s);
  const [vy, sy] = y.run(s);
  return vx === vy && sx === sy;
};

describe("State laws (fast-check)", () => {
  it("Functor identity", () => {
    fc.assert(
      fc.property(arbStateNumber, fc.integer(), (fa, s) => {
        const id = (x: A): A => x;
        const lhs = fa.map(id);
        const rhs = fa;
        expect(eqState(lhs, rhs, s)).toBe(true);
      })
    );
  });

  it("Functor composition", () => {
    fc.assert(
      fc.property(
        arbStateNumber,
        fc.func<A, A>(fc.integer()),
        fc.func<A, A>(fc.integer()),
        fc.integer(),
        (fa, f, g, s) => {
          const compose = (x: A): A => f(g(x));
          const lhs = fa.map(compose);
          const rhs = fa.map(g).map(f);
          expect(eqState(lhs, rhs, s)).toBe(true);
        }
      )
    );
  });

  it("Monad left identity", () => {
    fc.assert(
      fc.property(
        fc.integer(),
        fc.func<A, StateT<S, A>>(arbStateNumber),
        fc.integer(),
        (a, f, s) => {
          const lhs = State.of<S, A>(a).chain(f);
          const rhs = f(a);
          expect(eqState(lhs, rhs, s)).toBe(true);
        }
      )
    );
  });

  it("Monad right identity", () => {
    fc.assert(
      fc.property(arbStateNumber, fc.integer(), (fa, s) => {
        const lhs = fa.chain(State.of);
        const rhs = fa;
        expect(eqState(lhs, rhs, s)).toBe(true);
      })
    );
  });

  it("Monad associativity", () => {
    fc.assert(
      fc.property(
        arbStateNumber,
        fc.func<A, StateT<S, A>>(arbStateNumber),
        fc.func<A, StateT<S, A>>(arbStateNumber),
        fc.integer(),
        (fa, f, g, s) => {
          const lhs = fa.chain(f).chain(g);
          const rhs = fa.chain((a) => f(a).chain(g));
          expect(eqState(lhs, rhs, s)).toBe(true);
        }
      )
    );
  });

  it("sequence behaves like repeated chain", () => {
    fc.assert(
      fc.property(
        fc.array(arbStateNumber, { maxLength: 5 }),
        fc.integer(),
        (states, s0) => {
          const seq = State.sequence(states);
          const manual = states.reduce<StateT<S, A[]>>(
            (acc, st) => acc.chain((arr) => st.map((x) => [...arr, x])),
            State.of<S, A[]>([])
          );
          const [v1, s1] = seq.run(s0);
          const [v2, s2] = manual.run(s0);
          expect(v1).toEqual(v2);
          expect(s1).toBe(s2);
        }
      )
    );
  });
});
