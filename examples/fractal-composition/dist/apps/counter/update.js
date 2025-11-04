export const update = (msg, model) => {
    switch (msg.type) {
        case "INC": return { model: { count: model.count + 1 }, effects: [] };
        case "DEC": return { model: { count: model.count - 1 }, effects: [] };
        case "RESET": return { model: { count: 0 }, effects: [] };
        default: return { model, effects: [] };
    }
};
