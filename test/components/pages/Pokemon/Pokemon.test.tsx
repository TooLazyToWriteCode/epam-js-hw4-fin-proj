import Pokemon from "@/components/pages/Pokemon";
import pages from "@/pages";

import { mountPage } from "../../../helpers";

describe("pages/Pokemon", () => {
    beforeEach(() => {
        mountPage(pages.pokemon.path, <Pokemon />);
    });

    it("has something", () => {
        cy.root().should("not.be.empty").end();
    });
});
