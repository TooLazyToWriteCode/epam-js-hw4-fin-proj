import { pages } from "@/config/Pages";
import { mountPage } from "@/utilities/Test/mount";
import { goThroughPages } from "@/utilities/Test/pages";
import { getNormalPath } from "@/utilities/Test/paths";

import { Header } from "./Header";

goThroughPages((name, page) => {
    describe(`sections/Header@${name}`, () => {
        beforeEach(() => {
            mountPage([getNormalPath(page.path)], <Header />);
        });

        it("has a link with a proper text to the caught pokemons page", () => {
            cy.get(`a[href="${pages.caught.path}"]`)
                .contains("Caught Pokemons")
                .should("exist")
                .end();
        });

        it("has a link with a proper text to the home page", () => {
            cy.get(`a[href="${pages.home.path}"]`)
                .contains("Home")
                .should("exist")
                .end();
        });
    });
});
