# algebraic-fx

A production-ready functional programming library for TypeScript featuring algebraic data types, effect management, and virtual DOM rendering with optimal keyed diffing.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## Features

- 🎯 **Pure Functional**: All operations are referentially transparent
- 🔒 **Type-Safe**: Leverages TypeScript's type system with branded types
- ⚡ **High Performance**: O(n log n) keyed list diffing with LIS algorithm
- 🎭 **Effect System**: Compose IO, Reader, and Task effects with DomEnv injection
- 🌳 **Virtual DOM**: Minimal Mithril-style VDOM with SVG support
- 🚫 **Abort Support**: Full AbortSignal integration in Task API
- 📦 **Tree-Shakeable**: Import only what you need
- 🧪 **Production Ready**: Battle-tested algorithms, bounded caches, comprehensive error handling

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core ADTs](#core-adts)
  - [Either](#either)
  - [Maybe](#maybe)
  - [Task](#task)
  - [IO](#io)
  - [Reader](#reader)
  - [State](#state)
  - [Writer](#writer)
  - [Stream](#stream)
  - [Validation](#validation)
- [Effect System](#effect-system)
- [Virtual DOM](#virtual-dom)
- [DOM Helpers](#dom-helpers)
- [HTTP Client](#http-client)
- [WebSocket](#websocket)
- [Server-Side Rendering](#server-side-rendering)
- [API Reference](#api-reference)
- [Design Philosophy](#design-philosophy)

---

## Installation

```bash
npm install algebraic-fx

Or with yarn:

yarn add algebraic-fx


⸻

Quick Start

Basic Either Usage

import { Either } from 'algebraic-fx/adt/either';

// Parse a number safely
const parseNumber = (str: string): Either<string, number> => {
  const n = parseInt(str, 10);
  return isNaN(n) ? Either.Left('Not a number') : Either.Right(n);
};

const result = parseNumber('42')
  .map(n => n * 2)
  .map(n => `Result: ${n}`)
  .getOrElse('Error occurred');

console.log(result); // "Result: 84"

Building a Simple App

import { IO } from 'algebraic-fx/adt/io';
import { renderApp } from 'algebraic-fx/core/render';
import { render, m } from 'algebraic-fx/core/mithril-lite';
import type { Program } from 'algebraic-fx/core/types';

// Model
type Model = { count: number };

// Messages
type Msg =
  | { type: 'increment' }
  | { type: 'decrement' };

// Program
const program: Program<Model, Msg> = {
  init: IO.of({ model: { count: 0 }, effects: [] }),

  update: (msg, model) => {
    switch (msg.type) {
      case 'increment':
        return { model: { count: model.count + 1 }, effects: [] };
      case 'decrement':
        return { model: { count: model.count - 1 }, effects: [] };
    }
  },

  view: (model, dispatch) =>
    m('div', [
      m('h1', `Count: ${model.count}`),
      m('button', { onclick: () => dispatch({ type: 'increment' }) }, 'Increment'),
      m('button', { onclick: () => dispatch({ type: 'decrement' }) }, 'Decrement')
    ])
};

// Mount the app
const root = IO(() => document.getElementById('app') as HTMLElement);
const app = renderApp(render)(root, program);
app.run();


⸻

Core ADTs

Either

Represents a value that can be one of two types: Left (error) or Right (success).

import { Either, Left, Right } from 'algebraic-fx/adt/either';

// Basic construction
const success = Right<number>(42);
const failure = Left<string>('Error occurred');

// Pattern matching
const result = Either.fold(
  (err) => `Error: ${err}`,
  (val) => `Success: ${val}`,
  success
); // "Success: 42"

// Chaining operations
const divide = (a: number, b: number): Either<string, number> =>
  b === 0 ? Left('Division by zero') : Right(a / b);

const computation = divide(10, 2)
  .chain(n => divide(n, 5))
  .map(n => n * 100); // Right(100)

// Converting from nullable
const fromDb = Either.fromNullable('Not found')(someValue);

// Traversing arrays
const results = Either.traverse(
  (x: number) => x > 0 ? Right(x * 2) : Left('Negative number'),
  [1, 2, 3]
); // Right([2, 4, 6])

Key Methods:
	•	map<B>(f: (a: A) => B): Either<L, B> - Transform the Right value
	•	chain<B>(f: (a: A) => Either<L, B>): Either<L, B> - Monadic bind
	•	fold<B>(onLeft, onRight): B - Pattern match both sides
	•	getOrElse(default: A): A - Extract value or use default
	•	mapLeft<L2>(f: (l: L) => L2): Either<L2, A> - Transform Left value

⸻

Maybe

Represents an optional value: Just<A> or Nothing.

import { Maybe, Just, Nothing } from 'algebraic-fx/adt/maybe';

// Basic usage
const findUser = (id: number): Maybe<User> =>
  id === 1 ? Just({ id: 1, name: 'Alice' }) : Nothing;

const userName = findUser(1)
  .map(user => user.name)
  .getOrElse('Unknown'); // "Alice"

// Chain operations
const result = findUser(1)
  .chain(user => findAddress(user.id))
  .chain(address => findCity(address.cityId))
  .map(city => city.name); // Maybe<string>

// Filter
const adult = Just({ age: 25 })
  .filter(person => person.age >= 18); // Just({ age: 25 })

const minor = Just({ age: 15 })
  .filter(person => person.age >= 18); // Nothing

// Convert from nullable
const maybeValue = Maybe.fromNullable(null); // Nothing
const maybeValue2 = Maybe.fromNullable('hello'); // Just("hello")

Key Methods:
	•	map<B>(f: (a: A) => B): Maybe<B>
	•	chain<B>(f: (a: A) => Maybe<B>): Maybe<B>
	•	filter(predicate: (a: A) => boolean): Maybe<A>
	•	getOrElse(default: A): A
	•	fold<B>(onNothing, onJust): B

⸻

Task

Represents an asynchronous computation that may fail. Supports AbortSignal for cancellation.

import { Task } from 'algebraic-fx/adt/task';
import { Either, Left, Right } from 'algebraic-fx/adt/either';

// Create a Task
const fetchUser = (id: number): Task<Error, User> =>
  Task.fromAbortable(async (signal) => {
    const res = await fetch(`/api/users/${id}`, { signal });
    if (!res.ok) return Left(new Error('Fetch failed'));
    const data = await res.json();
    return Right(data);
  });

// Chain Tasks
const getUserPosts = (userId: number): Task<Error, Post[]> =>
  fetchUser(userId)
    .chain(user => fetchPosts(user.id))
    .map(posts => posts.filter(p => p.published));

// Run with abort support
const controller = new AbortController();
getUserPosts(1).runWith(controller.signal).then(result => {
  // result is Either<Error, Post[]>
});

// Cancel after timeout
setTimeout(() => controller.abort(), 5000);

// Parallel execution
Task.all([fetchUser(1), fetchUser(2), fetchUser(3)])
  .run()
  .then(result => {
    // result is Either<Error, [User, User, User]>
  });

// With timeout
const timedFetch = Task.timeout(3000, new Error('Timeout'))(fetchUser(1));

// Delay execution
const delayed = Task.delay(1000)(fetchUser(1));

Key Static Methods:
	•	Task.of<A>(a: A): Task<never, A>
	•	Task.reject<E>(e: E): Task<E, never>
	•	Task.all<E, A>(tasks: Task<E, A>[]): Task<E, A[]>
	•	Task.sequence<E, A>(tasks: Task<E, A>[]): Task<E, A[]>
	•	Task.race<E, A>(tasks: Task<E, A>[]): Task<E, A>
	•	Task.delay(ms: number)
	•	Task.timeout<E>(ms, error)
	•	Task.fromAbortable<E, A>(f: (signal: AbortSignal) => Promise<Either<E, A>>)

⸻

IO

Represents a synchronous side effect that has not yet been executed.

import { IO } from 'algebraic-fx/adt/io';

// Create IO actions
const getTime = IO(() => Date.now());
const log = (msg: string) => IO(() => console.log(msg));

// Compose IO actions
const program = getTime
  .chain(time => log(`Current time: ${time}`))
  .map(() => 'Done');

// Nothing has executed yet

// Run the IO to execute side effects
const result = program.run();

// Sequence multiple IOs
const actions = [log('Step 1'), log('Step 2'), log('Step 3')];
IO.sequence(actions).run();

// Error handling
const safeRead = IO.tryCatch(
  () => JSON.parse('{'),
  (err) => ({ error: String(err) })
);

Key Methods:
	•	map<B>(f: (a: A) => B): IO<B>
	•	chain<B>(f: (a: A) => IO<B>): IO<B>
	•	run(): A

⸻

Reader

Represents a computation that depends on some environment or configuration.

import { Reader } from 'algebraic-fx/adt/reader';

type Config = {
  apiUrl: string;
  apiKey: string;
};

const getApiUrl = Reader.asks<Config, string>(env => env.apiUrl);
const getApiKey = Reader.asks<Config, string>(env => env.apiKey);

const buildHeaders = Reader.asks<Config, HeadersInit>(env => ({
  Authorization: `Bearer ${env.apiKey}`,
  'Content-Type': 'application/json',
}));

const fetchUser = (id: number) =>
  getApiUrl.chain(url =>
    buildHeaders.map(headers =>
      fetch(`${url}/users/${id}`, { headers })
    )
  );

const config: Config = {
  apiUrl: 'https://api.example.com',
  apiKey: 'secret-key',
};

const promise = fetchUser(1).run(config);

Key Static Methods:
	•	Reader.ask<E>(): Reader<E, E>
	•	Reader.asks<E, A>(f: (env: E) => A): Reader<E, A>
	•	Reader.local<E, A>(f: (env: E) => E)

⸻

State

Represents a stateful computation.

import { State } from 'algebraic-fx/adt/state';

type CounterState = { count: number; history: number[] };

const increment = State.modify<CounterState>(s => ({
  count: s.count + 1,
  history: [...s.history, s.count + 1],
}));

const getCount = State.gets<CounterState, number>(s => s.count);

const program = increment
  .chain(() => increment)
  .chain(() => getCount)
  .map(count => `Count is ${count}`);

const [result, finalState] = program.run({ count: 0, history: [0] });

Key Static Methods:
	•	State.get<S>(): State<S, S>
	•	State.put<S>(s: S): State<S, void>
	•	State.modify<S>(f: (s: S) => S): State<S, void>
	•	State.gets<S, A>(f: (s: S) => A): State<S, A>

⸻

Writer

Represents a computation with an accumulated log or output. Supports monoid operations for strings, arrays, numbers, and custom types.

import { Writer } from 'algebraic-fx/adt/writer';

// String logs
const log = (msg: string) => Writer.tell<string>(msg);

const computation = Writer.of<string, number>(5, '')
  .chain(n => Writer(() => [n * 2, `Doubled ${n}. `]))
  .chain(n => Writer(() => [n + 3, `Added 3. `]));

const [value, logs] = computation.run();
// value: 13
// logs: "Doubled 5. Added 3. "

// Array logs
const arrayWriter = Writer.of<string[], number>(10, [])
  .chain(n => Writer(() => [n * 2, [`Step 1: doubled to ${n * 2}`]]))
  .chain(n => Writer(() => [n + 5, [`Step 2: added 5 to get ${n + 5}`]]));

const [value2, logArray] = arrayWriter.run();

Key Static Methods:
	•	Writer.of<W, A>(a: A, empty: W): Writer<W, A>
	•	Writer.tell<W>(w: W): Writer<W, void>
	•	Writer.evalWriter<W, A>(w: Writer<W, A>): A
	•	Writer.execWriter<W, A>(w: Writer<W, A>): W

⸻

Stream

Represents a stream of values over time. Similar to a minimal observable.

import { Stream } from 'algebraic-fx/adt/stream';

const numbers = Stream.fromArray([1, 2, 3, 4, 5]);
const doubled = numbers.map(n => n * 2);
const scanned = numbers.scan((acc, n) => acc + n, 0);

const unsubscribe = doubled.subscribe({
  next: (value) => console.log(value),
  error: (err) => console.error(err),
  complete: () => console.log('Done'),
});

unsubscribe();

Key Static Methods:
	•	Stream.of<A>(a: A): Stream<A>
	•	Stream.fromArray<A>(arr: A[]): Stream<A>
	•	Stream.fromEvent<E>(target: EventTarget, name: string): Stream<E>
	•	Stream.interval(ms: number): Stream<number>
	•	Stream.merge<A>(...streams: Stream<A>[]): Stream<A>

⸻

Validation

Represents validation that accumulates all errors, unlike Either which short circuits.

import { Validation, Success, Failure } from 'algebraic-fx/adt/validation';

const validateEmail = (email: string): Validation<string, string> =>
  email.includes('@') ? Success(email) : Failure(['Invalid email']);

const validateAge = (age: number): Validation<string, number> =>
  age >= 18 ? Success(age) : Failure(['Must be 18 or older']);

const validateUser = (email: string, age: number) =>
  Validation.combine([
    validateEmail(email),
    validateAge(age),
  ]);

const result = validateUser('bad', 15);
// Failure(["Invalid email", "Must be 18 or older"])

Key Methods:
	•	map<B>(f: (a: A) => B): Validation<E, B>
	•	ap<B>(vf: Validation<E, (a: A) => B>): Validation<E, B>
	•	chain<B>(f: (a: A) => Validation<E, B>): Validation<E, B>
	•	fold<B>(onFailure, onSuccess): B

⸻

Effect System

The effect system allows you to compose IO, Reader, and Task effects with dependency injection.

Effect Types

import { IO } from 'algebraic-fx/adt/io';
import { Reader } from 'algebraic-fx/adt/reader';
import { ioEffect, readerEffect } from 'algebraic-fx/core/types';
import type { DomEnv } from 'algebraic-fx/core/dom-env';

// IO effect with tag
const logEffect = ioEffect(IO(() => console.log('Hello')));

// Reader effect depending on DomEnv
const fetchEffect = readerEffect<DomEnv>(
  Reader((env) =>
    IO(() => {
      env.fetch('/api/data')
        .then(res => res.json())
        .then(data => console.log(data));
    })
  )
);

Using Effects in Programs

import type { Program } from 'algebraic-fx/core/types';
import { IO } from 'algebraic-fx/adt/io';
import { localSet, localGet } from 'algebraic-fx/core/dom-helpers';

type Model = { todos: string[] };
type Msg =
  | { type: 'add'; text: string }
  | { type: 'loaded'; todos: string[] };

const program: Program<Model, Msg> = {
  init: IO.of({
    model: { todos: [] },
    effects: [
      localGet('todos').map(stored =>
        IO(() => {
          if (stored) {
            const todos = JSON.parse(stored) as string[];
            // This would normally go through dispatch in update
            console.log('Loaded todos', todos);
          }
        })
      ),
    ],
  }),

  update: (msg, model) => {
    switch (msg.type) {
      case 'add': {
        const todos = [...model.todos, msg.text];
        return {
          model: { todos },
          effects: [
            localSet('todos', JSON.stringify(todos)),
          ],
        };
      }
      case 'loaded':
        return { model: { todos: msg.todos }, effects: [] };
    }
  },

  view: (model, dispatch) =>
    m('div', [
      m('ul', model.todos.map(t => m('li', t))),
      // etc
    ]),
};


⸻

Virtual DOM

Hyperscript API

import { m } from 'algebraic-fx/core/mithril-lite';

// Basic elements
m('div', 'Hello World');
m('span', { class: 'highlight' }, 'Text');

// Selector syntax
m('div#main.container.active', 'Content');

// Nested elements
m('ul', [
  m('li', 'Item 1'),
  m('li', 'Item 2'),
  m('li', 'Item 3'),
]);

// Events
m('button', {
  onclick: () => console.log('Clicked'),
}, 'Click');

// SVG
m('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 100, height: 100 }, [
  m('circle', { cx: 50, cy: 50, r: 40, fill: 'blue' }),
]);

// Keyed lists
m('ul',
  items.map(item =>
    m('li', { key: item.id }, item.text),
  ),
);

Rendering

import { render } from 'algebraic-fx/core/mithril-lite';

const root = document.getElementById('app') as HTMLElement;

render(root, m('div', 'Hello'));
render(root, [
  m('h1', 'Title'),
  m('p', 'Paragraph'),
]);

The renderer uses an O(n log n) keyed diff algorithm based on the longest increasing subsequence to minimize DOM mutations for keyed lists.

⸻

DOM Helpers

Environment based DOM helpers using the Reader pattern.

import {
  writeToElement,
  appendToElement,
  writeText,
  alertIO,
  scrollToIO,
  localSet,
  localGet,
  sessionSet,
  sessionGet,
  fetchIO,
  runDomIO,
} from 'algebraic-fx/core/dom-helpers';
import { browserEnv } from 'algebraic-fx/core/dom-env';

const env = browserEnv();

// DOM manipulation
runDomIO(writeToElement('#header', '<h1>New Title</h1>'), env);
runDomIO(appendToElement('#content', '<p>More text</p>'), env);
runDomIO(writeText('#status', 'Ready'), env);

// Window operations
runDomIO(alertIO('Hello'), env);
runDomIO(scrollToIO(0, 0), env);

// Local storage
runDomIO(localSet('user', JSON.stringify({ name: 'Alice' })), env);

const loaded = runDomIO(localGet('user'), env).run();
console.log('Loaded user raw:', loaded);

// Session storage
runDomIO(sessionSet('token', 'abc123'), env);

// Fetch wrapper
const usersIO = fetchIO('/api/users')
  .map(promise =>
    IO(() => promise.then(r => r.json())),
  );

runDomIO(usersIO, env)
  .run()
  .then(users => console.log(users));


⸻

HTTP Client

Type safe HTTP client using Reader<HttpEnv, Task<Error, A>>.

import { httpTask, type HttpEnv } from 'algebraic-fx/helpers/http-task';

type User = { id: number; name: string };

const env: HttpEnv = {
  fetch: window.fetch.bind(window),
  baseUrl: 'https://api.example.com',
};

const getUser = (id: number) =>
  httpTask<User>(`/users/${id}`);

getUser(1)
  .run(env)
  .run()
  .then(ea =>
    ea.fold(
      err => console.error('Error:', err),
      user => console.log('User:', user),
    ),
  );

You can customize error mapping:

type AppError =
  | { type: 'network'; message: string }
  | { type: 'auth'; message: string };

const mapError = (err: any): AppError => {
  if (err.status === 401) {
    return { type: 'auth', message: 'Unauthorized' };
  }
  return { type: 'network', message: String(err.message ?? err) };
};

const getUserSafe = (id: number) =>
  httpTask<AppError, User>(`/users/${id}`, undefined, mapError);


⸻

WebSocket

Minimal WebSocket helper returning a Task<Error, WebSocket>.

import { wsTask } from 'algebraic-fx/helpers/ws-task';

const connectWs = wsTask('wss://example.com/ws');

connectWs.run().then(ea =>
  ea.fold(
    err => {
      console.error('WS connection failed:', err);
    },
    ws => {
      console.log('WS connected');

      ws.onmessage = (evt) => {
        console.log('Message:', evt.data);
      };

      ws.onerror = (evt) => {
        console.error('WS error:', evt);
      };

      ws.onclose = () => {
        console.log('WS closed');
      };

      ws.send(JSON.stringify({ type: 'ping' }));
    },
  ),
);

You can combine this with Task.timeout or Task.race to enforce connection timeouts or to race WS connection with other effects.

⸻

Server-Side Rendering

render-to-string provides safe HTML string output from your VDOM tree, suitable for server side rendering and initial HTML payloads.

import { m } from 'algebraic-fx/core/mithril-lite';
import { renderToString } from 'algebraic-fx/core/render-to-string';

const view = (name: string) =>
  m('html', [
    m('head', [
      m('title', `Hello ${name}`),
    ]),
    m('body', [
      m('h1', `Hello ${name}`),
      m('div#app', 'App will hydrate here'),
    ]),
  ]);

const html = renderToString(view('World'));

// html is a complete HTML string with:
// - Proper text escaping
// - Proper attribute escaping
// - SVG aware output

You can serve this string from a Node HTTP server, then hydrate on the client with render if you want to take over the same DOM subtree.

⸻

API Reference

The full API reference is generated with TypeDoc￼.

After installing dev dependencies you can generate docs with:

npx typedoc

Basic typedoc.json example:

{
  "entryPoints": ["src/index.ts"],
  "out": "docs",
  "excludePrivate": true,
  "excludeProtected": true,
  "excludeExternals": false,
  "includeVersion": true,
  "readme": "none"
}

Key entry points:
	•	algebraic-fx/adt/either
	•	algebraic-fx/adt/maybe
	•	algebraic-fx/adt/task
	•	algebraic-fx/adt/io
	•	algebraic-fx/adt/reader
	•	algebraic-fx/adt/state
	•	algebraic-fx/adt/writer
	•	algebraic-fx/adt/stream
	•	algebraic-fx/adt/validation
	•	algebraic-fx/core/types
	•	algebraic-fx/core/render
	•	algebraic-fx/core/mithril-lite
	•	algebraic-fx/core/dom-env
	•	algebraic-fx/core/dom-helpers
	•	algebraic-fx/helpers/http-task
	•	algebraic-fx/helpers/ws-task

⸻

Design Philosophy

1. Minimal but complete

The library provides a small, orthogonal set of ADTs and primitives that can cover the majority of application level FP needs without forcing a heavy framework.

2. Bring your own ADTs

All ADTs are implemented in plain TypeScript without runtime dependencies, and external projects can replace or supplement them. Symbols and brands are chosen to coexist with user defined variants.

3. Explicit effects

Effects are modeled explicitly through IO, Task, Reader, and a small EffectLike layer. Programs describe what should happen and the runtime decides when to run it.

4. Renderer agnostic

The core effect and ADT layer does not depend on the DOM. The default renderer is a minimal Mithril style VDOM, but consumers can swap in their own render function.

5. Predictable performance

Keyed list diffing uses a longest increasing subsequence algorithm that keeps DOM operations minimal for typical CRUD and list reordering workloads. Selector caching is bounded to avoid unbounded memory growth.

6. SSR aware

The SSR renderer escapes both text and attributes correctly and avoids browser specific globals. DOM specific helpers live behind explicit environment types such as DomEnv and HttpEnv.

7. Typed from the start

All surface APIs are typed, including effects, environments, and higher kinded like combinators. The goal is to catch as much misuse as possible at compile time while keeping the runtime small and predictable.

8. Opt in features

No global singletons, no hidden mutable state. You wire together the environment, program, and renderer in userland. If you do not need a feature you can avoid importing it and dead code elimination can remove it from the bundle.


```
