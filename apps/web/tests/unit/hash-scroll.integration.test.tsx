import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("@/utils/fnScrollUtils", () => ({
    handleScrollClick: vi.fn(),
}));

import { handleScrollClick } from "@/utils/fnScrollUtils";
import { useInitialScroll } from "@/utils/scrollUtils";

describe("useInitialScroll", () => {
    beforeEach(() => {
        window.location.hash = "#sans-permis";
        // @ts-expect-error: jsdom stub
        window.scrollTo = vi.fn();
    });

    afterEach(() => {
        vi.clearAllMocks();
        window.location.hash = "";
    });

    it("appelle handleScrollClick avec l'offset calculé", async () => {
        renderHook(() => useInitialScroll("/services"));
        await waitFor(() => {
            expect(handleScrollClick).toHaveBeenCalledWith("sans-permis", 102);
        });
    });
});
