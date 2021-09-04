import Pokemon from "@/components/pages/Pokemon";
import pages from "@/pages";

import { mountPage } from "../../../helpers/mount";
import { getNormalPath } from "../../../helpers/paths";

describe("pages/Pokemon", () => {
    beforeEach(() => {
        mountPage(getNormalPath(pages.pokemon.path), <Pokemon />);
    });

    it("has something", () => {
        cy.root().should("not.be.empty").end();
    });
});
