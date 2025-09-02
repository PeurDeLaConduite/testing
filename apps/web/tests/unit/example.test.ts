import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

function Hello() {
    return React.createElement("h1", null, "Bonjour");
}

describe("exemple de composant", () => {
    it("affiche Bonjour", () => {
        render(React.createElement(Hello));
        expect(screen.getByText("Bonjour")).toBeInTheDocument();
    });
});
