/**
 * ⚠️ Tests fournis à titre d’exemple. Adaptez les imports/paths à votre projet.
 * Activez-les une fois `src/menu/actions/adapter.ts` implémenté.
 */
import { describe, it, expect } from "vitest";

// ⚠️ Ajustez cet import à votre arborescence réelle
// import { toAction } from '@/menu/actions/adapter';

type MenuItem = {
    id: string;
    title: string;
    class: string;
    path?: string;
    AnchorId?: string;
    subItems?: MenuItem[];
    scrollOffset?: number;
};

// Stub d’impl pour démontrer la logique attendue (à remplacer par le vrai import)
function toAction(item: MenuItem, external: Record<string, () => void>) {
    if (item.subItems?.length) return { kind: "toggle", itemId: item.id };
    if (external[item.id]) return { kind: "externalClick", handlerId: item.id };
    if (item.path && item.AnchorId) return { kind: "href", href: `${item.path}${item.AnchorId}` };
    if (item.AnchorId)
        return {
            kind: "hash",
            targetId: item.AnchorId.replace(/^#/, ""),
            offset: item.scrollOffset,
        };
    if (item.path) return { kind: "href", href: item.path };
    return { kind: "toggle", itemId: item.id };
}

describe("toAction (exemple)", () => {
    const ext = { special: () => {} };

    it("subItems → toggle", () => {
        const it = {
            id: "a",
            title: "A",
            class: "",
            subItems: [{ id: "c", title: "C", class: "" }],
        } as MenuItem;
        expect(toAction(it, {})).toEqual({ kind: "toggle", itemId: "a" });
    });

    it("external handler → externalClick", () => {
        const it = { id: "special", title: "Ext", class: "" } as MenuItem;
        const res = toAction(it, ext);
        expect(res).toEqual({ kind: "externalClick", handlerId: "special" });
    });

    it('path+AnchorId → href "/page#id"', () => {
        const it = { id: "p", title: "P", class: "", path: "/page", AnchorId: "#x" } as MenuItem;
        expect(toAction(it, {})).toEqual({ kind: "href", href: "/page#x" });
    });

    it("AnchorId seul → hash", () => {
        const it = {
            id: "h",
            title: "H",
            class: "",
            AnchorId: "#top",
            scrollOffset: 32,
        } as MenuItem;
        expect(toAction(it, {})).toEqual({ kind: "hash", targetId: "top", offset: 32 });
    });

    it("path seul → href", () => {
        const it = { id: "p", title: "P", class: "", path: "/blog" } as MenuItem;
        expect(toAction(it, {})).toEqual({ kind: "href", href: "/blog" });
    });

    it("fallback → toggle", () => {
        const it = { id: "z", title: "Z", class: "" } as MenuItem;
        expect(toAction(it, {})).toEqual({ kind: "toggle", itemId: "z" });
    });
});
