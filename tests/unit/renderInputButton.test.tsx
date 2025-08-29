import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RenderInputButton from "@components/header/navInput/RenderInputButton";
import { svgComponents } from "@components/header/svgComponents";

describe("RenderInputButton", () => {
    const menuItem = { svg: "Search" as keyof typeof svgComponents };

    it("affiche le bouton de réinitialisation et appelle handleReset quand une requête est présente", () => {
        const handleReset = vi.fn();
        const handleSubmit = vi.fn();
        const { getByRole, container } = render(
            <RenderInputButton
                hasQuery={true}
                isSubmitted={false}
                showNavLinks={true}
                menuItem={menuItem}
                handleSubmit={handleSubmit}
                handleReset={handleReset}
            />
        );

        const button = getByRole("button", { name: "Réinitialiser la recherche" });
        fireEvent.click(button);
        expect(handleReset).toHaveBeenCalled();
        expect(container.querySelector(".close-search")).toBeTruthy();
    });

    it("appelle handleSubmit quand aucune requête n'est présente", () => {
        const handleReset = vi.fn();
        const handleSubmit = vi.fn();
        const { getByRole, container } = render(
            <RenderInputButton
                hasQuery={false}
                isSubmitted={false}
                showNavLinks={true}
                menuItem={menuItem}
                handleSubmit={handleSubmit}
                handleReset={handleReset}
            />
        );

        const button = getByRole("button", { name: "Valider la recherche" });
        fireEvent.click(button);
        expect(handleSubmit).toHaveBeenCalled();
        expect(container.querySelector(".close-search")).toBeNull();
    });
});
