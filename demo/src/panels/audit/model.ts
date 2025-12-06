import type { Model, Msg } from "./types";
import type { Dispatch } from "algebraic-fx";

export type AuditEntryVM = {
  summary: string;
  details: string;
};

export type AuditVM = {
  entries: AuditEntryVM[];
  hasEntries: boolean;
  exportJson: () => void;
  clear: () => void;
};

export const toViewModel = (model: Model, dispatch: Dispatch<Msg>): AuditVM => {
  const entries: AuditEntryVM[] = model.entries.map((e) => ({
    summary: `[${e.timestamp}] ${e.operation} (${e.success ? "ok" : "error"})`,
    details: JSON.stringify(e.details, null, 2),
  }));

  return {
    entries,
    hasEntries: entries.length > 0,
    exportJson: () => dispatch({ type: "EXPORT_JSON" }),
    clear: () => dispatch({ type: "CLEAR" }),
  };
};
