import { IO, m } from "algebraic-fx";

import type { AppEnv } from "../env";
import type { Model, Msg, AppEffects, AppDispatch } from "./types";

import {
  init as initHoldings,
  update as updateHoldings,
  view as viewHoldings,
} from "../features/holdings";
import {
  init as initTargets,
  update as updateTargets,
  view as viewTargets,
} from "../features/targets";
import {
  init as initAudit,
  update as updateAudit,
  view as viewAudit,
} from "../features/audit";
import {
  init as initCounter,
  update as updateCounter,
  view as viewCounter,
} from "../features/counter";
import {
  init as initTodos,
  update as updateTodos,
  view as viewTodos,
} from "../features/todos";
import {
  init as initWeather,
  update as updateWeather,
  view as viewWeather,
} from "../features/weather";
import {
  init as initStream,
  update as updateStream,
  view as viewStream,
} from "../features/stream";

// -----------------------------------------------------------------------------
// Effect lifting helper
// -----------------------------------------------------------------------------

const liftEffects =
  (tag: Msg["type"]) =>
  <InnerMsg>(
    fx: {
      run: (
        env: AppEnv,
        dispatch: (msg: InnerMsg) => void
      ) => void | Promise<void>;
    }[]
  ): AppEffects =>
    fx.map((innerFx) => ({
      run: (env: AppEnv, dispatch: AppDispatch) =>
        innerFx.run(env, (inner: InnerMsg) =>
          dispatch({ type: tag, msg: inner } as Msg)
        ),
    }));

// -----------------------------------------------------------------------------
// Init
// -----------------------------------------------------------------------------

export const init: IO<{ model: Model; effects: AppEffects }> = IO(() => {
  const holdings = initHoldings.run();
  const targets = initTargets.run();
  const audit = initAudit.run();
  const counter = initCounter.run();
  const todos = initTodos.run();
  const weather = initWeather.run();
  const stream = initStream.run();

  const model: Model = {
    holdings: holdings.model,
    targets: targets.model,
    audit: audit.model,
    counter: counter.model,
    todos: todos.model,
    weather: weather.model,
    stream: stream.model,
  };

  const effects: AppEffects = [
    ...liftEffects("Holdings")(holdings.effects),
    ...liftEffects("Targets")(targets.effects),
    ...liftEffects("Audit")(audit.effects),
    ...liftEffects("Counter")(counter.effects),
    ...liftEffects("Todos")(todos.effects),
    ...liftEffects("Weather")(weather.effects),
    ...liftEffects("Stream")(stream.effects),
  ];

  return { model, effects };
});

// -----------------------------------------------------------------------------
// Update
// -----------------------------------------------------------------------------

export const update = (
  msg: Msg,
  model: Model
): { model: Model; effects: AppEffects } => {
  switch (msg.type) {
    case "Holdings": {
      const { model: mHoldings, effects } = updateHoldings(
        msg.msg,
        model.holdings
      );
      return {
        model: { ...model, holdings: mHoldings },
        effects: liftEffects("Holdings")(effects),
      };
    }

    case "Targets": {
      const { model: mTargets, effects } = updateTargets(
        msg.msg,
        model.targets
      );
      return {
        model: { ...model, targets: mTargets },
        effects: liftEffects("Targets")(effects),
      };
    }

    case "Audit": {
      const { model: mAudit, effects } = updateAudit(msg.msg, model.audit);
      return {
        model: { ...model, audit: mAudit },
        effects: liftEffects("Audit")(effects),
      };
    }

    case "Counter": {
      const { model: mCounter, effects } = updateCounter(
        msg.msg,
        model.counter
      );
      return {
        model: { ...model, counter: mCounter },
        effects: liftEffects("Counter")(effects),
      };
    }

    case "Todos": {
      const { model: mTodos, effects } = updateTodos(msg.msg, model.todos);
      return {
        model: { ...model, todos: mTodos },
        effects: liftEffects("Todos")(effects),
      };
    }

    case "Weather": {
      const { model: mWeather, effects } = updateWeather(
        msg.msg,
        model.weather
      );
      return {
        model: { ...model, weather: mWeather },
        effects: liftEffects("Weather")(effects),
      };
    }

    case "Stream": {
      const { model: mStream, effects } = updateStream(msg.msg, model.stream);
      return {
        model: { ...model, stream: mStream },
        effects: liftEffects("Stream")(effects),
      };
    }
  }
};

// -----------------------------------------------------------------------------
// View
// -----------------------------------------------------------------------------

export const view = (model: Model, dispatch: AppDispatch) =>
  m("main.container", [
    m("header", [
      m("h1", "algebraic-fx — Portfolio & Effects Demo"),
      m(
        "p",
        "Multi-panel demo showcasing IO, Validation, effects, and virtual DOM."
      ),
    ]),

    m("section.grid", [
      // Finance column
      m("div", [
        m("h2", "Portfolio"),
        viewSummary(model.holdings.items, model.targets.items),
        viewHoldings(model.holdings, (msg) =>
          dispatch({ type: "Holdings", msg })
        ),
        viewTargets(model.targets, (msg) => dispatch({ type: "Targets", msg })),
      ]),

      // Right column: misc panels
      m("div", [
        m("h2", "Interactive Panels"),
        viewCounter(model.counter, (msg) => dispatch({ type: "Counter", msg })),
        viewTodos(model.todos, (msg) => dispatch({ type: "Todos", msg })),
        viewWeather(model.weather, (msg) => dispatch({ type: "Weather", msg })),
        viewStream(model.stream, (msg) => dispatch({ type: "Stream", msg })),
      ]),
    ]),

    m("section", [
      m("h2", "Audit log (Writer-style)"),
      viewAudit(model.audit, (msg) => dispatch({ type: "Audit", msg })),
    ]),
  ]);

// -----------------------------------------------------------------------------
// Summary view (simple drift-style summary using Maybe/Either internally)
// -----------------------------------------------------------------------------

import { Maybe, Either } from "algebraic-fx";
import type { Holding } from "../features/holdings/types";
import type { Target } from "../features/targets/types";

const viewSummary = (holdings: Holding[], targets: Target[]) => {
  const totalValue = holdings.reduce((sum: number, h: Holding) => {
    return sum + (h.price ? h.price * h.shares : 0);
  }, 0);

  const rows = targets.map((t: Target) => {
    const maybeHolding = Maybe.fromNullable(
      holdings.find((h: Holding) => h.symbol === t.symbol && h.price != null)
    );

    const currentValue = Maybe.getOrElse(
      0,
      maybeHolding.map((h) => h.price! * h.shares)
    );
    const currentPercent =
      totalValue > 0 ? (currentValue / totalValue) * 100 : 0;

    const diff = currentPercent - t.targetPercent;

    const direction: "under" | "over" | "ok" =
      Math.abs(diff) < 1 ? "ok" : diff < 0 ? "under" : "over";

    return { t, currentPercent, diff, direction };
  });

  const validation =
    rows.length === 0 ? Either.Left("No targets set") : Either.Right(rows);

  return m("article", [
    m("h3", "Drift summary"),
    Either.fold(
      (err: string) => m("p", err),
      (rws: typeof rows) =>
        m("table", [
          m("thead", [
            m("tr", [
              m("th", "Symbol"),
              m("th", "Target %"),
              m("th", "Current %"),
              m("th", "Drift"),
            ]),
          ]),
          m("tbody", [
            ...rws.map((r) =>
              m("tr", [
                m("td", r.t.symbol),
                m("td", r.t.targetPercent.toFixed(1)),
                m("td", r.currentPercent.toFixed(1)),
                m(
                  "td",
                  {
                    class:
                      r.direction === "ok"
                        ? ""
                        : r.direction === "over"
                          ? "text-danger"
                          : "text-warning",
                  },
                  r.diff.toFixed(1)
                ),
              ])
            ),
          ]),
        ]),
      validation
    ),
    m(
      "footer",
      { class: "secondary" },
      `Total portfolio value (demo): ${totalValue.toFixed(2)}`
    ),
  ]);
};

// -----------------------------------------------------------------------------
// Program exported
// -----------------------------------------------------------------------------

export const program = {
  init,
  update,
  view,
};
