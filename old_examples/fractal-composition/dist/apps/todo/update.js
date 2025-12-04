export const update = (msg, model) => {
    switch (msg.type) {
        case "SET_INPUT":
            return { model: { ...model, input: msg.value }, effects: [] };
        case "ADD":
            if (!model.input.trim())
                return { model, effects: [] };
            return {
                model: {
                    todos: [
                        ...model.todos,
                        { id: Date.now(), text: model.input, done: false },
                    ],
                    input: "",
                },
                effects: [],
            };
        case "TOGGLE":
            console.log(model.todos, msg);
            return {
                model: {
                    ...model,
                    todos: model.todos.map((t) => t.id === msg.id ? { ...t, done: !t.done } : t),
                },
                effects: [],
            };
        default:
            return { model, effects: [] };
    }
};
