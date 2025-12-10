import { IO } from "algebraic-fx";
import type { AuditModel } from "./types";

export const init: IO<AuditModel> = IO.of({
  nextId: 1,
  entries: [],
});
