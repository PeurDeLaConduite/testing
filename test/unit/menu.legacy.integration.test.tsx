import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import * as React from "react";
import { handleNavClick } from "../src/utils/fnScrollUtils";

// Composant de menu simplifié pour tester les comportements legacy
function LegacyMenu({ tabletMain, openButton }: { tabletMain: boolean; openButton: boolean }) {
    const [open, setOpen] = React.useState(false);
    const toggle = () => setOpen((v) => !v);
    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") toggle();
    };

    const reduced = tabletMain || openButton;

    return (
        <nav data-reduced={reduced ? "reduced" : "expanded"}>
            <ul>
                <li>
                    <button
                        aria-label="Parent"
                        aria-haspopup="true"
                        aria-expanded={open}
                        onClick={toggle}
                        onKeyDown={onKeyDown}
                    >
                        {reduced ? null : <span>Parent</span>}
                    </button>
                    {open && (
                        <ul data-testid="submenu">
                            <li>
                                <a href="/page#ancre">Sub</a>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
}

describe("menu legacy", () => {
    it("rend le menu étendu puis réduit selon tabletMain/openButton", () => {
        const { rerender } = render(<LegacyMenu tabletMain={false} openButton={false} />);
        expect(screen.getByText("Parent")).toBeVisible();

        rerender(<LegacyMenu tabletMain={true} openButton={true} />);
        expect(screen.queryByText("Parent")).toBeNull();
        expect(screen.getByLabelText("Parent")).toBeVisible();
    });

    it("ouvre et ferme un sous-menu via clic puis clavier", () => {
        render(<LegacyMenu tabletMain={false} openButton={false} />);
        const parent = screen.getByRole("button", { name: "Parent" });
        fireEvent.click(parent);
        expect(screen.getByTestId("submenu")).toBeInTheDocument();
        fireEvent.keyDown(parent, { key: "Enter" });
        expect(screen.queryByTestId("submenu")).toBeNull();
    });

    it("navigue vers une ancre via handleNavClick", () => {
        const updateRoute = vi.fn();
        const scroll = vi.fn();
        handleNavClick("/page#ancre", "/page", updateRoute, scroll, 0);
        expect(updateRoute).toHaveBeenCalledWith("/page");
        expect(updateRoute).toHaveBeenCalledWith("/page#ancre");
        expect(scroll).toHaveBeenCalledWith("ancre", 0);
    });
});
