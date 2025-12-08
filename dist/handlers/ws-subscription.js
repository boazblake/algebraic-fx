export const wsSubscriptionHandler = {
    start(id, payload, ctx) {
        const { url } = payload;
        const ws = new WebSocket(url);
        ws.onopen = () => {
            ctx.dispatch({
                type: "WS_OPEN",
                msg: { id },
            });
        };
        ws.onmessage = (ev) => {
            let data = ev.data;
            try {
                data = JSON.parse(ev.data);
            }
            catch {
                // keep as text
            }
            ctx.dispatch({
                type: "WS_FRAME",
                msg: {
                    id,
                    data: JSON.stringify(data),
                },
            });
        };
        ws.onerror = (error) => {
            ctx.dispatch({
                type: "WS_ERROR",
                msg: {
                    id,
                    message: error instanceof Event ? "ws error" : String(error),
                },
            });
        };
        ws.onclose = (ev) => {
            ctx.dispatch({
                type: "WS_CLOSE",
                msg: {
                    id,
                    code: String(ev.code),
                    reason: ev.reason,
                },
            });
        };
    },
    stop(_id, _ctx) {
        // optional: track sockets and close them here
    },
};
//# sourceMappingURL=ws-subscription.js.map