import { describe, expect, it } from "vitest";
import { normalize } from "@packages/domain/normalize";

describe("normalize", () => {
    it("retire les espaces et met en minuscule", () => {
        expect(normalize("  Salut  ")).toBe("salut");
    });
});
