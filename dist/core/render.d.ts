/**
 * @module core/render
 *
 * Runtime loop wiring Program<M,Msg,Env> to a renderer and environment.
 *
 * Responsibilities:
 *  - run Program.init
 *  - render initial view
 *  - process dispatch(msg) → update → view → effects
 *  - execute RawEffect<Env> via Effect<Env,Msg>, IO, Reader
 */
import type { Program, RawEffect, IOEffect, ReaderEffect, Dispatch } from "./types.js";
import type { IO } from "../adt/io.js";
import type { Reader } from "../adt/reader.js";
/**
 * Renderer function type.
 *
 * User supplies a function that updates the DOM from a VNode tree.
 */
export type Renderer = (root: Element, vnode: any) => void;
/**
 * Execute a list of RawEffect<Env> against the current environment.
 *
 * Supported forms:
 *   - IOEffect
 *   - ReaderEffect<Env>
 *   - Effect<Env,Msg>
 *
 * CORRECTED: Added runtime validation for dispatch and env
 *
 * @param effects  list of effects to run
 * @param env      environment for Readers and Effects
 * @param dispatch dispatch function for messages emitted by Effects
 */
export declare const runEffects: <Env, Msg>(effects: RawEffect<Env>[] | undefined, env: Env, dispatch: Dispatch<Msg>) => void;
/**
 * Construct an IOEffect from IO<void>.
 */
export declare const ioEffect: (io: IO<void>) => IOEffect;
/**
 * Construct a ReaderEffect from Reader<Env, IO<void>>.
 */
export declare const readerEffect: <E>(reader: Reader<E, IO<void>>) => ReaderEffect<E>;
/**
 * Connect Program<M,Msg,Env> to a renderer and environment.
 *
 * Flow:
 *   1. Run program.init
 *   2. Render initial view
 *   3. Run initial effects
 *   4. Return closed-over dispatch for user events
 *
 * CORRECTED: Added validation and error handling
 *
 * @param root     DOM root element
 * @param program  functional program
 * @param env      environment passed to effects
 * @param renderer renderer function
 */
export declare const renderApp: <M, Msg, Env>(root: Element, program: Program<M, Msg, Env>, env: Env, renderer: Renderer) => void;
//# sourceMappingURL=render.d.ts.map