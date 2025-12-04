export const IOEffectTag = Symbol("IOEffect");
export const ReaderEffectTag = Symbol("ReaderEffect");
export const ioEffect = (io) => ({
    _tag: IOEffectTag,
    io,
});
export const readerEffect = (reader) => ({
    _tag: ReaderEffectTag,
    reader,
});
//# sourceMappingURL=types.js.map