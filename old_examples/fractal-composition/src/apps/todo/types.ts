export type Todo = { id: number; text: string; done: boolean };
export type Msg =
  | { type: "SET_INPUT"; value: string }
  | { type: "ADD" }
  | { type: "TOGGLE"; id: number };

export type Model = { todos: Todo[]; input: string };
