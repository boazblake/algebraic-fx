import { m, type Dispatch } from "algebraic-fx";
import type { AuditModel, AuditMsg, AuditEntry } from "./types";

const fmtKind = (kind: AuditEntry["kind"]): string => {
  switch (kind) {
    case "AddHolding":
      return "Added holding";
    case "RemoveHolding":
      return "Removed holding";
    case "InvalidHoldingInput":
      return "Invalid holding input";
    case "AddTarget":
      return "Added target";
    case "RemoveTarget":
      return "Removed target";
  }
};

const fmtEntry = (entry: AuditEntry): string => {
  const when = new Date(entry.ts).toLocaleTimeString();
  const base = fmtKind(entry.kind);
  const data = JSON.stringify(entry.data);
  return `[${when}] ${base}: ${data}`;
};

export const view = (model: AuditModel, dispatch: Dispatch<AuditMsg>) =>
  m("section", [
    m("div", [
      m("h2", "Audit"),
      m(
        "button",
        {
          type: "button",
          onclick: () => dispatch({ type: "Clear" }),
        },
        "Clear"
      ),
    ]),
    m(
      "ul",
      model.entries.length === 0
        ? m("li", "No audit entries yet.")
        : model.entries.map((e) => m("li", { key: e.id }, fmtEntry(e)))
    ),
  ]);
