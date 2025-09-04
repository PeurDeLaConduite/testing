/**
 * Tests pour `scrollToId`.
 * JSDOM ne fait pas défiler la page, on vérifie l’appel et les options.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { scrollToId } from "@apps/menu/scroll/scrollToId";

let focusMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
    document.body.innerHTML = `<div style="height:2000px"></div><section id="target" tabindex="-1">X</section>`;

    // Mocks
    // @ts-expect-error: inject mock
    window.scrollTo = vi.fn();
    window.requestAnimationFrame = vi.fn((cb: FrameRequestCallback) => {
        cb(0);
        return 0;
    });
    window.matchMedia = vi.fn().mockReturnValue({
        matches: false,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    });

    focusMock = vi.fn();
    HTMLElement.prototype.focus = focusMock;

    // JSDOM getBoundingClientRect default
    const target = document.getElementById("target")!;
    target.getBoundingClientRect = () => ({
        top: 300,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        toJSON() {
            return {};
        },
    });

    // @ts-expect-error
    window.scrollY = 100;
});

afterEach(() => {
    vi.clearAllMocks();
});

describe("scrollToId", () => {
    it("défile jusqu’à la bonne position (offset pris en compte)", () => {
        scrollToId("target", 64);
        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 300 + 100 - 64,
            behavior: "smooth",
        });
        expect(focusMock).toHaveBeenCalledWith({ preventScroll: true });
    });

    it("utilise 'auto' si prefers-reduced-motion", () => {
        (window.matchMedia as any).mockReturnValue({
            matches: true,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        });
        scrollToId("target", 0);
        expect(window.scrollTo).toHaveBeenCalledWith({ top: 300 + 100, behavior: "auto" });
    });

    it("réessaie jusqu’à trouver l’élément (offset inclus)", () => {
        document.body.innerHTML = ""; // élément absent initialement
        const callbacks: FrameRequestCallback[] = [];
        window.requestAnimationFrame = vi.fn((cb: FrameRequestCallback) => {
            callbacks.push(cb);
            return 0;
        });

        scrollToId("target", 64);
        expect(window.scrollTo).not.toHaveBeenCalled();

        // première frame: l'élément n'existe pas, on simule le retry
        callbacks[0](0);
        expect(window.requestAnimationFrame).toHaveBeenCalledTimes(2);

        // on ajoute l'élément et on exécute la seconde frame
        document.body.innerHTML = `<section id="target" tabindex="-1">X</section>`;
        const target = document.getElementById("target")!;
        target.getBoundingClientRect = () => ({
            top: 300,
            left: 0,
            right: 0,
            bottom: 0,
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            toJSON() {
                return {};
            },
        });
        callbacks[1](0);

        expect(window.scrollTo).toHaveBeenCalledWith({ top: 300 + 100 - 64, behavior: "smooth" });
    });
});
