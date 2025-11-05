import { IO } from "effects-vdom";
import { update } from "./update";
import { view } from "./view";
import { init } from "./model";
export const program = {
    init: IO(() => init),
    update,
    view,
};
