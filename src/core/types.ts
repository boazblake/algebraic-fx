import type { IO } from "../adt/io.js";

/** Virtual DOM */

export type VChild = VNode | string | number | boolean | null | undefined;

export type Props = Record<string, any> & {
  oncreate?: (el: Element) => void;
  onupdate?: (el: Element, oldProps: Props) => void;
  onremove?: (el: Element) => void;
};

export type VNode = {
  tag: string;
  props?: Props | null;
  children: VChild[];
  key?: string | number;
};

/** Messages */

export type Payload<T extends string = string, M = unknown> = {
  type: T;
  msg?: M;
};

export type Dispatch<P> = (payload: P) => void;

/** Effects
 *
 * We normalize raw values (IO<void>, Reader<Env, IO<void>>) into these at runtime.
 * Userland can still return IO/Reader; EffectLike is the internal representation.
 */

export const IOEffectTag = Symbol("algebraic-fx/IOEffect");
export const EnvEffectTag = Symbol("algebraic-fx/EnvEffect");

export type IOEffect = {
  _effect: typeof IOEffectTag;
  io: IO<void>;
};

export type EnvEffect = {
  _effect: typeof EnvEffectTag;
  runWithEnv: (env: unknown) => IO<void>;
};

export type EffectLike = IOEffect | EnvEffect;

export const effectFromIO = (io: IO<void>): IOEffect => ({
  _effect: IOEffectTag,
  io,
});

export const effectFromEnv = (f: (env: unknown) => IO<void>): EnvEffect => ({
  _effect: EnvEffectTag,
  runWithEnv: f,
});

/** Program
 *
 * We keep effects as `any[]` at the Program boundary for backward compatibility.
 * Core normalizes them to EffectLike before execution.
 */

export type Program<M, P> = {
  init: IO<{ model: M; effects: any[] }>;
  update: (
    payload: P,
    model: M,
    dispatch: Dispatch<P>
  ) => { model: M; effects: any[] };
  view: (model: M, dispatch: Dispatch<P>) => VChild | VChild[];
};
