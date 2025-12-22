export type User = {
  id: number;
  name: string;
  email: string;
};

export type Msg =
  | { type: "users.fetch" }
  | { type: "users.loaded"; users: User[] }
  | { type: "users.failed"; error: string };

export type Model = {
  users: User[];
  loading: boolean;
  error: string | null;
};
