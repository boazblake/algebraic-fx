export type AppEnv = {
  window: Window & typeof globalThis;
  storage: Storage;
  now: () => number;
  usersBaseUrl: string;
  quotesBaseUrl: string;
};

export const makeEnv = (): AppEnv => {
  const w = window as unknown as Window & typeof globalThis;

  return {
    window: w,
    storage: w.localStorage,
    fetch: fetch,
    now: () => Date.now(),
    usersBaseUrl: "https://jsonplaceholder.typicode.com",
    quotesBaseUrl: "https://api.coingecko.com/api/v3",
  };
};
