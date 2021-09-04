import Header from "@/components/sections/Header";
import pages, { Page } from "@/pages";

import { getUnglobbedPath, mountPage } from "../../../helpers";

Object.entries(pages).forEach(([name, page]: [string, Page]) => {
    describe(`sections/Header@${name}`, () => {
        beforeEach(() => {
            mountPage(getUnglobbedPath(page.path), <Header />);
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
});
