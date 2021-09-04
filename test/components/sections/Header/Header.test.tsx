import { MemoryRouter } from "react-router-dom";
import { mount } from "@cypress/react";

import Header from "@/components/sections/Header";

describe("sections/Header", () => {
    beforeEach(() => {
        mount(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
    });

    it("has something", () => {
        cy.root().should("not.be.empty");
    });

    it("has a link to the caught pokemons page", () => {
        cy.get("a[href='/caught']").contains("Caught Pokemons").should("exist");
    });

    it("has a link to the home page", () => {
        cy.get("a[href='/']").contains("Home").should("exist");
    });
});
