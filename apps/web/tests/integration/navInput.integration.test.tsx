import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import * as React from "react";
import NavInput from "../../src/components/header/navInput/NavInput";
import { SearchProvider } from "../../src/utils/context/SearchContext";
import { menuItems } from "../../src/assets/data/menuItems";

vi.mock("next/navigation", () => ({
    useRouter: () => ({ push: vi.fn() }),
    useSearchParams: () => new URLSearchParams(),
}));

describe("NavInput suggestions", () => {
    it("ferme le sous-menu après un clic sur une suggestion", async () => {
        render(
            <SearchProvider>
                <NavInput
                    menuItem={menuItems.search[0]}
                    isOpen={true}
                    showNavLinks={true}
                    placeholder="Rechercher..."
                    onMenuToggle={() => {}}
                    onMouseEnter={() => {}}
                    onFocus={() => {}}
                />
            </SearchProvider>
        );

        const input = screen.getByPlaceholderText(/Rechercher\.\.\./i);
        fireEvent.change(input, { target: { value: "contact" } });

        const suggestion = await screen.findByText("contact");
        fireEvent.click(suggestion);

        await waitFor(() => {
            expect(screen.queryByText("contact")).toBeNull();
        });
    });
});
