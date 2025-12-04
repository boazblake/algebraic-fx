import type { IO } from "../adt/io.js";
import type { Reader } from "../adt/reader.js";
import type { DomEnv } from "./dom-env.js";

export type VChild = VNode | string | number | boolean | null | undefined;

export type Msg = Record<string, string>;

export type Payload<T extends string = string, M extends Msg = Msg> = {
  type: T;
  msg: M;
};

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

export type Dispatch<P> = (payload: P) => void;

export interface EffectLike {
  run: () => void;
}

export const IOEffectTag = Symbol("IOEffect");
export const ReaderEffectTag = Symbol("ReaderEffect");

export type IOEffect = {
  _tag: typeof IOEffectTag;
  io: IO<void>;
};

export type ReaderEffect<E> = {
  _tag: typeof ReaderEffectTag;
  reader: Reader<E, IO<void>>;
};

export const ioEffect = (io: IO<void>): IOEffect => ({
  _tag: IOEffectTag,
  io,
});

export const readerEffect = <E>(
  reader: Reader<E, IO<void>>
): ReaderEffect<E> => ({
  _tag: ReaderEffectTag,
  reader,
});

export type RawEffect<E> =
  | IO<void> // backward compat
  | Reader<E, IO<void>> // backward compat
  | EffectLike
  | IOEffect
  | ReaderEffect<E>;

export type Program<M, P, E = DomEnv> = {
  init: IO<{ model: M; effects: RawEffect<E>[] }>;
  update: (
    payload: P,
    model: M,
    dispatch: Dispatch<P>
  ) => { model: M; effects: RawEffect<E>[] };
  view: (model: M, dispatch: Dispatch<P>) => VChild | VChild[];
};
