export const wsSubscriptionHandler = {
    start(id, payload, ctx) {
        const ws = new WebSocket(payload.url);
        ws.onopen = () => {
            ctx.dispatch({ type: "WS_OPEN", id });
        };
        ws.onmessage = (ev) => {
            let data = ev.data;
            try {
                data = JSON.parse(ev.data);
            }
            catch { }
            ctx.dispatch({ type: "WS_FRAME", id, data });
        };
        ws.onerror = (err) => {
            ctx.dispatch({ type: "WS_ERROR", id, error: err });
        };
        ws.onclose = (ev) => {
            ctx.dispatch({
                type: "WS_CLOSE",
                id,
                code: ev.code,
                reason: ev.reason,
            });
        };
    },
    stop(_id, ctx) {
        // optional: close the ws if you keep references
    },
};
//# sourceMappingURL=ws-subscription.js.map