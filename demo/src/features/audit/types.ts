export type AuditKind =
  | "AddHolding"
  | "RemoveHolding"
  | "InvalidHoldingInput"
  | "AddTarget"
  | "RemoveTarget";

export type AuditEntry = {
  id: number;
  ts: number;
  kind: AuditKind;
  data: Record<string, unknown>;
};

export type AuditModel = {
  nextId: number;
  entries: AuditEntry[];
};

export type AuditMsg =
  | { type: "Append"; entry: AuditEntry }
  | { type: "Clear" };
