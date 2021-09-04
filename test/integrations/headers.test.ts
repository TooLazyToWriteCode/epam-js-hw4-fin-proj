import pages from "../../src/pages";

import { goThroughPages } from "../helpers/pages";
import { getNormalPath } from "../helpers/paths";

goThroughPages((name, page) => {
    describe(`headers@${name}`, () => {
        beforeEach(() => {
            cy.visit(getNormalPath(page.path));
        });

        it("has the link to the caught pokemons page", () => {
            cy.get("header").contains("Caught Pokemons").click().end();
            cy.location("pathname").should("eq", pages.caught.path).end();
        });

        it("has the link to the home page", () => {
            cy.get("header").contains("Home").click().end();
            cy.location("pathname").should("eq", pages.home.path).end();
        });
    });
});
