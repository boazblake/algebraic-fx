import { describe, it, expect } from "vitest";
import { Reader } from "../src/adt/reader.js";

type Env = { base: number };

describe("Reader", () => {
  it("reads from environment", () => {
    const r = Reader<Env, number>((env) => env.base + 1);
    expect(r.run({ base: 10 })).toBe(11);
  });

  it("supports map", () => {
    const r = Reader<Env, number>((env) => env.base);
    const r2 = r.map((x) => x * 2);

    expect(r2.run({ base: 3 })).toBe(6);
  });

  it("supports chain", () => {
    const r = Reader<Env, number>((env) => env.base);
    const r2 = r.chain((x) => Reader<Env, number>((env) => env.base + x));

    expect(r2.run({ base: 2 })).toBe(4);
  });

  it("supports ask", () => {
    const ask = Reader.ask<Env>();
    const r = ask.map((env) => env.base * 3);

    expect(r.run({ base: 4 })).toBe(12);
  });

  it("supports local (env transform)", () => {
    type EnvWithExtra = Env & { extra: number };

    const r = Reader<Env, number>((env) => env.base);
    const r2 = Reader.local<EnvWithExtra, Env, number>((env) => ({
      base: env.base + env.extra,
    }))(r);

    expect(r2.run({ base: 1, extra: 2 })).toBe(3);
  });

  it("supports local with narrowing environment", () => {
    type Config = { dbUrl: string; apiKey: string };
    type DbConfig = { dbUrl: string };

    const readDb = Reader<DbConfig, string>((env) => env.dbUrl);
    const withConfig = Reader.local<Config, DbConfig, string>((env) => ({
      dbUrl: env.dbUrl,
    }))(readDb);

    expect(withConfig.run({ dbUrl: "localhost", apiKey: "secret" })).toBe(
      "localhost"
    );
  });
});
