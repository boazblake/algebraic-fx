import { Either } from "./either";
export type Task<E, A> = {
    run: () => Promise<Either<E, A>>;
    map: <B>(f: (a: A) => B) => Task<E, B>;
    chain: <B>(f: (a: A) => Task<E, B>) => Task<E, B>;
};
/** Main constructor */
export declare const Task: {
    <E, A>(run: () => Promise<Either<E, A>>): Task<E, A>;
    of<A>(a: A): Task<never, A>;
    reject<E>(e: E): Task<E, never>;
    tryCatch<A>(f: () => Promise<A>): Task<unknown, A>;
};
export default Task;
