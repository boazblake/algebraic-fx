[**algebraic-fx v0.0.1**](../../../README.md)

***

[algebraic-fx](../../../README.md) / [index](../../README.md) / Task

# Task

Construct a Task given a function that accepts an optional AbortSignal.

The returned Task is lazy and will not run until `.run()` or `.runWith(signal)` is called.

## Param

Underlying async function returning `Either<E, A>`

## Functions

- [all](functions/all.md)
- [ap](functions/ap.md)
- [bimap](functions/bimap.md)
- [chain](functions/chain.md)
- [delay](functions/delay.md)
- [fold](functions/fold.md)
- [fromAbortable](functions/fromAbortable.md)
- [fromEither](functions/fromEither.md)
- [getOrElse](functions/getOrElse.md)
- [map](functions/map.md)
- [mapError](functions/mapError.md)
- [of](functions/of.md)
- [race](functions/race.md)
- [reject](functions/reject.md)
- [sequence](functions/sequence.md)
- [timeout](functions/timeout.md)
- [toPromise](functions/toPromise.md)
- [traverse](functions/traverse.md)
- [tryCatch](functions/tryCatch.md)
- [tryCatchK](functions/tryCatchK.md)
