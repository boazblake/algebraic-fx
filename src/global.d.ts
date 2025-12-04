import type { Dispatch, Payload } from "./types.js";

export {};

declare global {
  interface Window {
    dispatch?: Dispatch<Payload>;
  }
}
