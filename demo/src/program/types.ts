// src/program/types.ts

import type { Model as ClockModel, Msg as ClockMsg } from "../apps/clock/types";

export type Model = {
  clock: ClockModel;
};

export type Msg = ClockMsg;
