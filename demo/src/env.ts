export type AppEnv = {
  document: Document;
  window: Window & typeof globalThis;

  apiBaseUrl: string;

  now: () => number;
  log: (...args: unknown[]) => void;
};
