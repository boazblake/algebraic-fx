import { IO } from "effects-vdom";

export const registerGlobalIO = (dispatch: (msg: any) => void) => [
  IO(() => {
    const resize = () =>
      dispatch({
        type: "RESIZE",
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener("resize", resize);
    resize(); // initialize once

    // Return cleanup if you ever need it
    return () => window.removeEventListener("resize", resize);
  }),
];
