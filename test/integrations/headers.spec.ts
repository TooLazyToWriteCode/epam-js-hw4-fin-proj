import { pages } from "../../src/config/Pages";
import { goThroughPages } from "../../src/utilities/Test/pages";
import { getNormalPath } from "../../src/utilities/Test/paths";

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
