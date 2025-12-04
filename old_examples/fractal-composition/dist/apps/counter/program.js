import { IO } from "effects-vdom";
import { init } from "./model";
import { update } from "./update";
import { view } from "./view";
export const program = {
    init: IO(() => init),
    update,
    view,
};
