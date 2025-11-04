import { IO, Writer } from "effects-vdom";
export const init = IO(() => {
    const env = {
        fetch: fetch,
        baseUrl: "https://jsonplaceholder.typicode.com",
        api: "https://jsonplaceholder.typicode.com",
    };
    const empty = { data: [], loading: false };
    const model = {
        theme: "light",
        env,
        active: "posts",
        logs: Writer.of("", []),
        posts: empty,
        users: empty,
        comments: empty,
        albums: empty,
        photos: empty,
        todos: empty,
    };
    return { model, effects: [] };
});
