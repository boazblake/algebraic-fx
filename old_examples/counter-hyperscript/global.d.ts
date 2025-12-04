declare global {
  interface Window {
    dispatch: (msg: any) => void;
  }
}
// Silence missing type definitions for untyped modules
declare module "nanomorph";
declare module "hyperscript";
declare module "hyperscript-helpers";
