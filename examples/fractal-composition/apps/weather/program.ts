import type { Program, Dispatch, EffectLike } from "effects-vdom";
import { Task, Either, httpTask ,IO} from "effects-vdom";
import { div, h1, input, button, p } from "../../renderer";

/** Environment & Model */
export type Env = { fetch: typeof fetch };
export type Model = { city: string; loading: boolean; data?: any; env: Env };

/** Messages */
export type Msg =
  | { type: "SET_CITY"; city: string }
  | { type: "FETCH" }
  | { type: "FETCH_OK"; data: any }
  | { type: "FETCH_ERR"; error: string | { status: number; message: string } };

/** Init */
export const init = {
  run: (): { model: Model; effects: EffectLike[] } => ({
    model: { city: "London", loading: false, env: { fetch } },
    effects: [],
  }),
};


const fetchWeather = (city: string, env: Env, dispatch: Dispatch) =>
  httpTask<{ status: number; message: string }, any>(
    `https://api.open-meteo.com/v1/forecast?latitude=51.5&longitude=0.1&current_weather=true`
  )
    .run({ fetch: env.fetch, baseUrl: "" })
    .map((result) =>
      IO(() => {
        if (Either.isRight(result)) {
          dispatch({ type: "FETCH_OK", data: result.right });
        } else {
          const err = result.left;
          dispatch({
            type: "FETCH_ERR",
            error:
              typeof err.status === "number"
                ? err
                : { status: 0, message: (err as any)?.message ?? "Unknown error" },
          });
        }
      })
    );

/** Update */
export const update = (msg: Msg, m: Model, dispatch: Dispatch) => {
  switch (msg.type) {
    case "SET_CITY":
      return { model: { ...m, city: msg.city }, effects: [] };

    case "FETCH": {
      const effect = fetchWeather(m.city, m.env, dispatch);
      return { model: { ...m, loading: true }, effects: [effect] };
    }

    case "FETCH_OK":
      return { model: { ...m, loading: false, data: msg.data }, effects: [] };

    case "FETCH_ERR":
      return { model: { ...m, loading: false, data: { error: msg.error } }, effects: [] };

    default:
      return { model: m, effects: [] };
  }
};

/** View */
export const view = (m: Model, dispatch: (msg: Msg) => void) =>
  div({ class: "p-3 border rounded space-y-2" }, [
    h1({}, "Weather"),
    input({
      value: m.city,
      oninput: (e: Event) =>
        dispatch({ type: "SET_CITY", city: (e.target as HTMLInputElement).value }),
    }),
    button({ onclick: () => dispatch({ type: "FETCH" }) }, m.loading ? "Loading..." : "Fetch"),
    p({}, m.data ? JSON.stringify(m.data) : ""),
  ]);

/** Program */
export const program: Program<Model, Msg> = { init, update, view };
