import type { Program, Dispatch, VChild, EffectLike } from "./types.js";
import { IO } from "../adt/io.js";
import { browserEnv, type DomEnv } from "./dom-env.js";
import { IOEffectTag, EnvEffectTag } from "./types.js";
import type { IO as IOType } from "../adt/io.js";
import type { Reader } from "../adt/reader.js";

/**
 * Renderer: takes a root element and a vnode (or vnode array) and applies it.
 */
export type Renderer = (root: Element, vnode: VChild | VChild[]) => void;

/**
 * Values that userland can legitimately put into effects arrays.
 * We keep this union internal to render.ts; Program remains `any[]` for effects.
 */
type EffectCandidate =
  | EffectLike
  | IOType<void>
  | Reader<unknown, IOType<void>>
  | null
  | undefined;

/**
 * Normalize a raw effect candidate into an EffectLike.
 *
 * Rules (no ADT changes assumed):
 * - If it has _effect tag → EffectLike as-is.
 * - If it has .run and run.length === 0 → treat as IO<void>.
 * - If it has .run and run.length === 1 → treat as Reader<Env, IO<void>>.
 */
const normalizeEffect = (e: EffectCandidate): EffectLike | null => {
  if (!e) return null;

  const anyE = e as any;

  // Already an EffectLike
  if (anyE._effect === IOEffectTag || anyE._effect === EnvEffectTag) {
    return anyE as EffectLike;
  }

  // Something with run(): IO or Reader
  if (typeof anyE.run === "function") {
    const arity = anyE.run.length;

    // IO<void> → IOEffect
    if (arity === 0) {
      return {
        _effect: IOEffectTag,
        io: anyE as IOType<void>,
      };
    }

    // Reader<Env, IO<void>> → EnvEffect
    if (arity === 1) {
      const reader = anyE as Reader<unknown, IOType<void>>;
      return {
        _effect: EnvEffectTag,
        runWithEnv: (env: unknown) => reader.run(env),
      };
    }
  }

  // Unknown or unsupported effect shape
  return null;
};

export const renderApp =
  (renderer: Renderer, env: DomEnv = browserEnv()) =>
  <M, P>(
    rootIO: IO<Element>,
    program: Program<M, P>
  ): IO<{
    dispatch: Dispatch<P>;
    getModel: () => M | undefined;
    destroy: () => void;
  }> =>
    rootIO
      .map((root) => {
        let model: M | undefined = undefined;
        const queue: P[] = [];
        let queued = false;
        let destroyed = false;

        const runEffects = (fx?: EffectCandidate[]) => {
          if (!fx || destroyed) return;

          for (const raw of fx) {
            const eff = normalizeEffect(raw);
            if (!eff) continue;

            if (eff._effect === IOEffectTag) {
              eff.io.run();
              continue;
            }

            if (eff._effect === EnvEffectTag) {
              const io = eff.runWithEnv(env);
              io?.run();
            }
          }
        };

        const renderAndRunEffects = (m: M, effects: EffectCandidate[]) => {
          if (destroyed) return;
          renderer(root, program.view(m, dispatch));
          runEffects(effects);
        };

        const step = (payload: P) => {
          if (destroyed || model === undefined) return;
          const { model: next, effects } = program.update(
            payload,
            model,
            dispatch
          );
          model = next;
          renderAndRunEffects(model, (effects as EffectCandidate[]) || []);
        };

        const dispatch: Dispatch<P> = (payload) => {
          if (destroyed) return;
          queue.push(payload);
          if (!queued) {
            queued = true;
            requestAnimationFrame(() => {
              if (destroyed) return;
              queued = false;
              const msgs = queue.splice(0, queue.length);
              for (const msg of msgs) step(msg);
            });
          }
        };

        const start = () => {
          const { model: m0, effects } = program.init.run();
          model = m0;
          renderAndRunEffects(model, (effects as EffectCandidate[]) || []);
        };

        return IO(() => {
          start();
          return {
            dispatch,
            getModel: () => model,
            destroy: () => {
              destroyed = true;
              queued = false;
              queue.splice(0, queue.length);
            },
          };
        });
      })
      .chain((io) => io);
