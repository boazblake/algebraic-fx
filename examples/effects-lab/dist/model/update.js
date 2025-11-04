import { IO, Writer, httpTask, Either } from "effects-vdom";
/** Create an IO that fetches a resource and dispatches results */
const fetchResource = (key, page, limit, env, dispatch) => {
    const task = httpTask(`/${key}?_page=${page}&_limit=${limit}`).run(env);
    // Wrap the Task inside an IO
    return IO(async () => {
        const either = await task.run();
        if (Either.isRight(either)) {
            dispatch({
                type: "FETCH_SUCCESS",
                key,
                data: either.right,
                page,
            });
        }
        else {
            const err = either.left;
            dispatch({
                type: "FETCH_ERROR",
                key,
                error: typeof err === "string"
                    ? { status: 0, message: err }
                    : err || { status: 0, message: "Unknown error" },
            });
        }
    });
};
export const update = (msg, m, dispatch) => {
    switch (msg.type) {
        case "SET_ACTIVE":
            return { model: { ...m, active: msg.key } };
        case "FETCH_RESOURCE": {
            const key = msg.key;
            const { limit } = m[key];
            const effect = fetchResource(key, 1, limit, m.env, dispatch);
            return {
                model: { ...m, [key]: { ...m[key], loading: true } },
                effects: [effect],
            };
        }
        case "FETCH_PAGE": {
            const key = msg.key;
            const { limit } = m[key];
            const effect = fetchResource(key, msg.page, limit, m.env, dispatch);
            return {
                model: { ...m, [key]: { ...m[key], loading: true } },
                effects: [effect],
            };
        }
        case "FETCH_SUCCESS": {
            const key = msg.key;
            const logs = m.logs.chain(() => Writer(() => ["", [`Fetched ${key} page ${msg.page || 1}`]]));
            return {
                model: {
                    ...m,
                    [key]: {
                        ...m[key],
                        data: msg.data,
                        loading: false,
                        page: msg.page || 1,
                    },
                    logs,
                },
            };
        }
        case "FETCH_ERROR": {
            const key = msg.key;
            const logs = m.logs.chain(() => Writer(() => [
                "",
                [
                    `Error fetching ${key}: ${typeof msg.error === "string"
                        ? msg.error
                        : JSON.stringify(msg.error)}`,
                ],
            ]));
            return {
                model: {
                    ...m,
                    [key]: { ...m[key], loading: false, error: msg.error },
                    logs,
                },
            };
        }
        case "TOGGLE_THEME": {
            const next = m.theme === "light" ? "dark" : "light";
            const effect = IO(() => document.documentElement.classList.toggle("dark", next === "dark"));
            return { model: { ...m, theme: next }, effects: [effect] };
        }
        default:
            return { model: m };
    }
};
