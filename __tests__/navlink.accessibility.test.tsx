import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import NavLinkShow from "@/components/header/navLink/NavLinkShow";
import { NavigationProvider } from "@/utils/context/NavigationContext";
import type { MenuItem } from "@assets/data/interfaces/menu";

// Mock next/navigation used in NavigationProvider
vi.mock("next/navigation", () => ({
    useRouter: () => ({ push: vi.fn() }),
    usePathname: () => "/",
}));

const menuItem: MenuItem = {
    id: "test",
    title: "Test",
    class: "",
    path: "/test",
    svg: "Home",
    AnchorId: "",
    subItems: [{ id: "sub1", title: "Sub 1", AnchorId: "#sub1", class: "" }],
};

const renderComponent = (props: Partial<React.ComponentProps<typeof NavLinkShow>> = {}) => {
    const defaultProps = {
        menuItem,
        onNavigationClick: vi.fn(),
        isOpen: false,
        showNavLinks: false,
        handleMenuClick: vi.fn(),
        onMenuToggle: vi.fn(),
        openButton: true,
        openMainButton: false,
        onMouseEnter: vi.fn(),
        onFocus: vi.fn(),
        ...props,
    };

    return render(
        <NavigationProvider>
            <NavLinkShow {...defaultProps} />
        </NavigationProvider>
    );
};

describe("NavLinkShow — navigation clavier", () => {
    const modes = [
        { name: "mobile", width: 480 },
        { name: "tablet", width: 1100 },
        { name: "desktopReduced", width: 1300 },
        { name: "desktop", width: 1500 },
    ];

    modes.forEach(({ name, width }) => {
        test(`Enter déclenche onMenuToggle en mode ${name}`, () => {
            Object.defineProperty(window, "innerWidth", { writable: true, value: width });
            const onMenuToggle = vi.fn();
            renderComponent({ onMenuToggle });
            const wrapper = screen.getByRole("menuitem");
            fireEvent.keyDown(wrapper, { key: "Enter" });
            expect(onMenuToggle).toHaveBeenCalledWith(menuItem.id, expect.anything());
        });
    });

    test("met à jour aria-expanded selon l'état", () => {
        const { rerender } = renderComponent({ isOpen: false });
        let wrapper = screen.getByRole("menuitem");
        expect(wrapper).toHaveAttribute("aria-expanded", "false");

        rerender(
            <NavigationProvider>
                <NavLinkShow
                    menuItem={menuItem}
                    onNavigationClick={vi.fn()}
                    isOpen={true}
                    showNavLinks={true}
                    handleMenuClick={vi.fn()}
                    onMenuToggle={vi.fn()}
                    openButton={false}
                    openMainButton={true}
                    onMouseEnter={vi.fn()}
                    onFocus={vi.fn()}
                />
            </NavigationProvider>
        );
        wrapper = screen.getByRole("menuitem");
        expect(wrapper).toHaveAttribute("aria-expanded", "true");
    });
});
