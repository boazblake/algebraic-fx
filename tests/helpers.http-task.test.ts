import { describe, it, expect, vi } from "vitest";
import {
  httpTask,
  type HttpEnv,
  type DefaultHttpError,
} from "../src/helpers/http-task.js";

import { isLeft, isRight } from "../src/adt/either.js";

describe("httpTask helper", () => {
  const mkEnv = (
    impl: (info: RequestInfo, init?: RequestInit) => Promise<Response>
  ): HttpEnv => ({
    fetch: impl as any,
    baseUrl: "https://api.test",
  });

  const jsonResponse = (status: number, body: unknown): Response =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  it("builds correct URL with baseUrl and path", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(jsonResponse(200, { ok: true }));
    const env = mkEnv(fetchSpy);

    const reader = httpTask<{ ok: boolean }>("/status");
    const task = reader.run(env);

    const result = await task.run();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy.mock.calls[0][0]).toBe("https://api.test/status");

    expect(isRight(result)).toBe(true);
    expect((result as any).right).toEqual({ ok: true });
  });

  it("propagates non-2xx as DefaultHttpError", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response("fail", {
        status: 500,
        statusText: "Server error",
      })
    );

    const env = mkEnv(fetchSpy);
    const reader = httpTask<{ foo: string }>("/foo");
    const task = reader.run(env);

    const result = await task.run();

    expect(isLeft(result)).toBe(true);

    const err = (result as any).left as DefaultHttpError;
    expect(err.status).toBe(500);
    expect(err.message).toBe("HTTP 500 Server error");
  });

  it("maps JSON parse errors", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response("not-json", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const env = mkEnv(fetchSpy);
    const reader = httpTask<{ foo: string }>("/foo");
    const task = reader.run(env);

    const result = await task.run();

    expect(isLeft(result)).toBe(true);

    const err = (result as any).left as DefaultHttpError;
    expect(err.status).toBe(200);
    expect(err.message).toBe("Failed to parse JSON response");
  });

  it("uses custom error mapper when provided", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response("fail", {
        status: 404,
        statusText: "Not Found",
      })
    );

    const env = mkEnv(fetchSpy);

    type CustomError = { code: string; status: number };

    const reader = httpTask<CustomError, { foo: string }>(
      "/foo",
      undefined,
      (e) => {
        const base = e as DefaultHttpError;
        return { code: "NOT_FOUND", status: base.status };
      }
    );

    const task = reader.run(env);
    const result = await task.run();

    expect(isLeft(result)).toBe(true);

    const err = (result as any).left as CustomError;
    expect(err.code).toBe("NOT_FOUND");
    expect(err.status).toBe(404);
  });

  it("maps network errors into DefaultHttpError", async () => {
    const fetchSpy = vi.fn().mockRejectedValue(new Error("boom"));

    const env = mkEnv(fetchSpy);
    const reader = httpTask<{ foo: string }>("/foo");
    const task = reader.run(env);

    const result = await task.run();

    expect(isLeft(result)).toBe(true);

    const err = (result as any).left as DefaultHttpError;
    expect(err.status).toBe(null);
    expect(err.message).toBe("boom");
  });
});
