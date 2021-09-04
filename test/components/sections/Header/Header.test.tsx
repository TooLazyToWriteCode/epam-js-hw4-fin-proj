import Header from "@/components/sections/Header";
import pages, { Page } from "@/pages";

import { mountPage } from "../../../helpers/mount";
import { goThroughPages } from "../../../helpers/pages";
import { getNormalPath } from "../../../helpers/paths";

goThroughPages((name, page) => {
    describe(`sections/Header@${name}`, () => {
        beforeEach(() => {
            mountPage(getNormalPath(page.path), <Header />);
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
