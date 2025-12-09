algebraic-fx

API Reference

This reference lists all public modules and functions exposed by the algebraic-fx library.

The library is structured into four major layers:
	1.	ADTs — Pure algebraic data types
	2.	Core — Program runtime, virtual DOM, effects
	3.	SSR — render-to-string
	4.	Helpers — http-task, DOM helpers (optional), etc.

Everything here is pure except where explicitly noted (IO boundaries).

⸻

1. ADT Modules

All ADTs follow Functor / Applicative / Monad laws unless stated otherwise.

⸻

1.1. IO

A lazy, synchronous effect.

type IO<A> = {
  run: () => A;
  map: <B>(f: (a: A) => B) => IO<B>;
  chain: <B>(f: (a: A) => IO<B>) => IO<B>;
};

Constructors

IO(() => A)        // lazy constructor
IO.of(a)           // pure value
IO.tryCatch(f)     // convert throw → error Either

Laws
	•	Referential transparency
	•	map, chain satisfy Functor/Monad laws

⸻

1.2. Either<E, A>

type Left<E>  = { _tag: "Left"; left: E };
type Right<A> = { _tag: "Right"; right: A };
type Either<E, A> = Left<E> | Right<A>;

Constructors

Left(e)
Right(a)
Either.of(a)             // Right(a)
Either.fromNullable(onNull)(v)
Either.tryCatch(f)       // try/catch to Either

Combinators

map(f)
mapLeft(f)
bimap(onLeft, onRight)
chain(f)
ap(fab)
getOrElse(default, e)
fold(onLeft, onRight, e)

Type guards

Either.isLeft(e)
Either.isRight(e)


⸻

1.3. Maybe

type Just<A> = { _tag: "Just"; value: A };
type Nothing = { _tag: "Nothing" };
type Maybe<A> = Just<A> | Nothing;

Constructors

Maybe.Just(a)
Maybe.Nothing
Maybe.of(a)
Maybe.fromNullable(a)

Combinators

map(f)
chain(f)
ap(fab)
getOrElse(default, ma)
getOrElseW(() => default, ma)
alt(ma, mb)
fold(onNothing, onJust, ma)
sequence([...Maybe])
traverse(f, arr)

Type guards

Maybe.isJust(ma)
Maybe.isNothing(ma)


⸻

1.4. Task<E, A>

Lazy async computation with AbortSignal support.

type Task<E, A> = {
  run:    () => Promise<Either<E, A>>;
  runWith(signal: AbortSignal): Promise<Either<E, A>>;
  map(f)
  chain(f)
  ap(fab)
  mapError(f)
  bimap(onErr, onOk)
};

Constructors

Task(f)                   // f: (signal?) => Promise<Either<E,A>>
Task.of(a)
Task.reject(e)
Task.tryCatch(f)
Task.tryCatchK(f, mapErr)

Abort-aware constructor

taskFromAbortable(register, onError)

Combinators

Task.map
Task.chain
Task.ap
Task.mapError
Task.bimap
Task.fold(onErr, onOk)
Task.getOrElse(default)
Task.delay(ms)
Task.timeout(ms, timeoutErr)
Task.sequence(tasks)
Task.traverse(f)(arr)
Task.all(tasks)
Task.race(tasks)
Task.fromEither(e)
Task.toPromise(t)

Laws
	•	Functor, Applicative, Monad
	•	Cancellation: runWith(abortController.signal) aborts upstream register functions

⸻

1.5. Reader<E, A>

type Reader<E, A> = {
  run: (env: E) => A;
  map(f)
  chain(f)
  ap(fab)
};

Constructors

Reader(f)
Reader.of(a)
Reader.ask            // identity Reader<E,E>
Reader.asks(f)

Combinators

Reader.map
Reader.chain
Reader.ap
Reader.local(f)(reader)


⸻

1.6. Writer<W, A>

Requires W to form a monoid under (empty, combine).

type Writer<W, A> = {
  run: () => [A, W];
  map(f)
  chain(f)
  ap(fab)
};

Constructors

Writer(run, combine?)          // low-level
Writer.of(a, empty, combine?)
Writer.tell(w, empty, combine?)
Writer.listen(writer, empty, combine?)
Writer.sequence(writers, empty, combine?)
Writer.traverse(f, empty, combine?)(arr)

Laws
	•	Functor/Monad laws
	•	Log preservation laws
	•	Listen laws

⸻

1.7. State<S, A>

type State<S, A> = {
  run: (s: S) => [A, S];
  map(f)
  chain(f)
  ap(fab)
};

Constructors

State(f)
State.of(a)
State.get()
State.put(s)
State.modify(f)
State.gets(f)

Combinators

State.run(s)(state)
State.evalState(s)(state)
State.execState(s)(state)
State.sequence(states)
State.traverse(f)(arr)


⸻

1.8. Validation<E, A>

Error-accumulating variant.

type Success<A> = { _tag: "Success"; value: A };
type Failure<E> = { _tag: "Failure"; errors: E[] };
type Validation<E, A> = Success<A> | Failure<E>;

Constructors

Success(a)
Failure([e])
Validation.of(a)

Combinators

map(f)
ap(vf, va)     // Failure accumulation via E[] semigroup
chain(f)       // short-circuiting version

Laws
	•	Applicative accumulation laws

⸻

1.9. Stream

Minimal push-stream.

type Stream<A> = {
  subscribe(observer): Unsubscribe;
  map(f)
  filter(f)
  scan(f, seed)
  chain(f)
};

Constructors

Stream(register)     // register(observer) → unsubscribe
Stream.of(a)
Stream.empty
Stream.merge(a, b)
Stream.combineLatest(a, b)
Stream.zip(a, b)


⸻

2. Core Runtime API

⸻

2.1. VNode Creation (m or hyperscript)

m(tag, props?, ...children)

	•	Returns a VNode with normalized children.
	•	Compatible with mithril-lite renderer.

⸻

2.2. Renderer interface

type Renderer = (root: Element, vnode: any) => void;

You provide this to renderApp.

⸻

2.3. Program Execution (renderApp)

renderApp(root: Element, program: Program<M, Msg, Env>, env: Env, renderer: Renderer): void

Effects:
	•	Runs init
	•	Runs initial renderer
	•	Executes initial effects
	•	Provides dispatch closure for update/view/event handlers
	•	Executes update → renderer → effects on every dispatch

Invariants:
	•	One initial render
	•	Deterministic outputs under equal msg sequences

⸻

2.4. Effect Interpretation (runEffects)

runEffects(effects: RawEffect<Env>[], env: Env, dispatch: Dispatch<Msg>): void

Supports:
	•	IO<void>
	•	Reader<Env, IO<void>>
	•	Effect<Env, Msg>
	•	IOEffect
	•	ReaderEffect<Env>

Error policy:
	•	Individual effects may throw; errors are logged
	•	The sequence continues

⸻

2.5. Tags

IOEffectTag
ReaderEffectTag

Used by the normalized effect interpreter.

Utility constructors:

ioEffect(io)
readerEffect(reader)


⸻

2.6. Payload / Dispatch Types

type Payload<T extends string, M extends object = {}> = {
  type: T;
  msg: M;
};

type Dispatch<P> = (payload: P) => void;

Conventions:
	•	Use namespaced type strings: "Holdings.Add", "Auth.Login", etc.
	•	Msg unions are composed of Payload<T, M> variants.

⸻

3. Server-Side Rendering (SSR)

⸻

3.1. renderToString(vnode)

renderToString(node: unknown): string

Features:
	•	Pure, deterministic
	•	Proper escaping of text and attribute values
	•	Handles style objects
	•	Omits event handlers
	•	Supports arrays and primitive children
	•	Void element protection

Laws verified:
	•	JSON round-trip: renderToString(v) === renderToString(JSON.parse(JSON.stringify(v)))
	•	Ignored props stability

⸻

4. Environment Types

⸻

4.1. DomEnv

Minimal environment for browser renderers:

type DomEnv = {
  document: Document;
  window: Window;
};

Optional browser-specific helpers appear in helper modules but are not required by core.

⸻

5. Helper Modules

⸻

5.1. httpTask

A Reader<HttpEnv, Task<E,A>> helper.

type HttpEnv = {
  fetch: typeof fetch;
  baseUrl?: string;
};

httpTask<A>(path, options?): Reader<HttpEnv, Task<DefaultHttpError, A>>
httpTask<E, A>(path, options, mapErr): Reader<HttpEnv, Task<E, A>>

Features:
	•	Respects Task cancellation via AbortSignal
	•	JSON decoding
	•	Error mapping

⸻

6. Versioning & Packaging

(To be expanded in step 7.)

⸻

7. Benchmarks (reserved for step 6)

(To be produced.)

