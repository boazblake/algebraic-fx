// global.d.ts
declare global {
  interface Window {
    dispatch: (msg: any) => void;
  }
}
export {};
