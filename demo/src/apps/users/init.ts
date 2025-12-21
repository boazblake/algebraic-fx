import { IO } from "algebraic-fx";
import type { IO as IOType } from "algebraic-fx/adt/io";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Msg } from "./update";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Model = {
  users: User[];
  loading: boolean;
  error: string | null;
};

export const init: IOType<{ model: Model; effects: RawEffect<AppEnv, Msg>[] }> =
  IO.of({
    model: { users: [], loading: false, error: null },
    effects: [],
  });
