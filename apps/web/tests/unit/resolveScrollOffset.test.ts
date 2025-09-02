import { describe, it, expect } from "vitest";
import { resolveScrollOffset } from "@/menu/scroll/resolveScrollOffset";

describe("resolveScrollOffset", () => {
    it("privilégie l'offset du MenuItem", () => {
        const offset = resolveScrollOffset({ scrollOffset: 10 }, { scrollOffset: 20 });
        expect(offset).toBe(10);
    });

    it("utilise l'offset du SubItem si celui du MenuItem est absent", () => {
        const offset = resolveScrollOffset(undefined, { scrollOffset: 30 });
        expect(offset).toBe(30);
    });

    it("retourne 0 si aucun offset n'est défini", () => {
        const offset = resolveScrollOffset();
        expect(offset).toBe(0);
    });
});
