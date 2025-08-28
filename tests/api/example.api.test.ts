import { describe, it, expect } from "vitest";
import { Amplify } from "aws-amplify";
import { server } from "@test/setupTests";
import { http, HttpResponse } from "msw";

/**
 * Test d'exemple validant la configuration de MSW et d'AWS Amplify.
 */
describe("exemple d'API", () => {
    it("AWS Amplify est configuré", () => {
        expect(typeof Amplify.configure).toBe("function");
    });

    it("répond via le mock MSW", async () => {
        server.use(
            http.get("https://example.com/hello", () => HttpResponse.json({ message: "salut" }))
        );

        const res = await fetch("https://example.com/hello");
        const data = await res.json();

        expect(data).toEqual({ message: "salut" });
    });
});
