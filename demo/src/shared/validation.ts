import { Validation } from "algebraic-fx";
import type {
  ValidationError,
  Holding,
  TargetAllocation,
} from "./types";

const failure = <A = never>(
  field: string,
  message: string
): Validation<ValidationError, A> =>
  Validation.Failure([{ field, message }]);

const success = <A>(
  value: A
): Validation<ValidationError, A> => Validation.Success(value);

export const validateTicker = (
  rawTicker: string
): Validation<ValidationError, string> => {
  const ticker = rawTicker.trim().toUpperCase();

  if (ticker.length === 0) {
    return failure("ticker", "Ticker is required");
  }

  if (!/^[A-Z]{1,5}$/.test(ticker)) {
    return failure("ticker", "Ticker must be 1–5 uppercase letters");
  }

  return success(ticker);
};

export const validateShares = (
  rawShares: string
): Validation<ValidationError, number> => {
  const cleaned = rawShares.trim();

  if (!cleaned) {
    return failure("shares", "Shares required");
  }

  const n = Number(cleaned);

  if (!Number.isFinite(n)) {
    return failure("shares", "Shares must be numeric");
  }

  if (n <= 0) {
    return failure("shares", "Shares must be > 0");
  }

  return success(n);
};

export const validateHoldingInput = (
  ticker: string,
  shares: string
): Validation<ValidationError, { ticker: string; shares: number }> => {
  const vTicker = validateTicker(ticker);
  const vShares = validateShares(shares);
  
  // Use applicative pattern
  const makeTuple = (t: string) => (s: number) => ({ ticker: t, shares: s });
  
  return Validation.ap(
    Validation.ap(
      Validation.Success(makeTuple),
      vTicker
    ),
    vShares
  );
};

export const validateNoDuplicate = (
  ticker: string,
  holdings: Holding[]
): Validation<ValidationError, null> => {
  return holdings.some((h) => h.ticker === ticker)
    ? failure("ticker", `Ticker ${ticker} already exists`)
    : success(null);
};

export const validateAllocation = (
  stocks: number,
  bonds: number,
  cash: number
): Validation<ValidationError, TargetAllocation> => {
  const errors: ValidationError[] = [];

  if (stocks < 0) {
    errors.push({ field: "stocks", message: "Cannot be negative" });
  }

  if (bonds < 0) {
    errors.push({ field: "bonds", message: "Cannot be negative" });
  }

  if (cash < 0) {
    errors.push({ field: "cash", message: "Cannot be negative" });
  }

  const total = stocks + bonds + cash;

  if (total !== 100) {
    errors.push({
      field: "allocation",
      message: `Allocation must sum to 100%, got ${total}%`,
    });
  }

  return errors.length > 0
    ? Validation.Failure(errors)
    : Validation.Success({ stocks, bonds, cash });
};
