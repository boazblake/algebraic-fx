export type Msg =
  | { type: "clock.effect" }
  | { type: "clock.start" }
  | { type: "clock.stop" }
  | { type: "clock.tick"; ms: number };

export type Model = {
  running: boolean;
  nowMs: number;
};
