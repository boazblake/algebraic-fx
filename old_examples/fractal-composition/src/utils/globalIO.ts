import { Reader, IO, type Dispatch } from "effects-vdom";
import { DomEnv } from "../types";
export const registerGlobalIO = (dispatch: (msg: any) => void) =>
  Reader<DomEnv, IO<() => void>>((env) =>
    IO(() => {
      const resize = () =>
        dispatch({
          type: "RESIZE",
          width: env.window.innerWidth,
          height: env.window.innerHeight,
        });

      env.window.addEventListener("resize", resize);
      resize();
      return () => env.window.removeEventListener("resize", resize);
    })
  );
