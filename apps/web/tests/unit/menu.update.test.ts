import { describe, it, expect } from "vitest";
import { isMainItemActive, updateMenuItems } from "@utils/updateMenuUtils";
import type { MenuItem } from "@assets/data/menuItems";

describe("updateMenuUtils", () => {
    describe("isMainItemActive", () => {
        it("détermine les chemins actifs", () => {
            expect(isMainItemActive("/", "/")).toBe(true);
            expect(isMainItemActive("/", "/#section")).toBe(true);
            expect(isMainItemActive("/services", "/services/offre")).toBe(true);
            expect(isMainItemActive("/blog", "/contact")).toBe(false);
        });
    });

    describe("updateMenuItems", () => {
        it("ajoute la classe active sur l’item et son sous-item correspondant", () => {
            const items: MenuItem[] = [
                {
                    id: "main",
                    title: "Main",
                    class: "",
                    path: "/services",
                    AnchorId: "#top",
                    subItems: [{ id: "sub", title: "Sub", AnchorId: "#section", class: "" }],
                },
                {
                    id: "other",
                    title: "Other",
                    class: "",
                    path: "/other",
                    AnchorId: "#top",
                },
            ];
            const res = updateMenuItems(items, "section", "/services");
            expect(res[0].class).toBe("active");
            expect(res[0].subItems?.[0].class).toBe("active");
            expect(res[1].class).toBe("");
        });
    });
});
