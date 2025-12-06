import type { AuditEntry } from "@shared/types";

export type Model = {
  entries: AuditEntry[];
};

export type Msg =
  | { type: "ADD_ENTRY"; entry: AuditEntry }
  | { type: "CLEAR" }
  | { type: "EXPORT_JSON" };
