export type Todo = { id: number; text: string; done: boolean };
export type Model = { todos: Todo[]; input: string };

export const init = {
  model: { todos: [], input: "" },
  effects: [],
};
