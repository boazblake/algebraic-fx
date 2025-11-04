export const Failure = (errors) => ({
    _tag: "Failure",
    errors,
});
export const Success = (value) => ({
    _tag: "Success",
    value,
});
/** Functor map */
export const map = (f, v) => v._tag === "Success" ? Success(f(v.value)) : v;
/** Applicative apply */
export const ap = (vf, va) => {
    if (vf._tag === "Failure" && va._tag === "Failure")
        return Failure([...vf.errors, ...va.errors]);
    if (vf._tag === "Failure")
        return vf;
    if (va._tag === "Failure")
        return va;
    return Success(vf.value(va.value));
};
/** Monad chain */
export const chain = (f, v) => v._tag === "Success" ? f(v.value) : v;
/** Lift value */
export const of = (a) => Success(a);
/** Fold */
export const fold = (onFail, onSucc, v) => (v._tag === "Failure" ? onFail(v.errors) : onSucc(v.value));
/** Unified object export */
export const Validation = { Failure, Success, map, ap, chain, of, fold };
export default Validation;
