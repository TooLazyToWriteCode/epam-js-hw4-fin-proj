import { MemoryRouter } from "react-router-dom";
import { mount } from "@cypress/react";

import Header from "@/components/sections/Header";
import pages from "@/pages";

describe("sections/Header", () => {
    beforeEach(() => {
        mount(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
    });

    it("has a link with a proper text to the caught pokemons page", () => {
        cy.get(`a[href='${pages.caught.path}']`)
            .contains("Caught Pokemons")
            .should("exist")
            .end();
    });

    it("has a link with a proper text to the home page", () => {
        cy.get(`a[href='${pages.home.path}']`)
            .contains("Home")
            .should("exist")
            .end();
    });
});
