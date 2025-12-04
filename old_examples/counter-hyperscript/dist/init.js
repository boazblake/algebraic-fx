import { IO } from "effects-vdom";
import { model } from './model';
export const init = IO(() => ({ model, effects: [] }));
