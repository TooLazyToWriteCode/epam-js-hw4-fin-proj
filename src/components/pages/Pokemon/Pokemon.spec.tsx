import { pages } from "@/config/Pages";
import { mountPage } from "@/utilities/Test/mount";
import { getNormalPath } from "@/utilities/Test/paths";

import { Pokemon } from "./Pokemon";

describe("pages/Pokemon", () => {
    beforeEach(() => {
        mountPage([getNormalPath(pages.pokemon.path)], <Pokemon />);
    });

    it("has something", () => {
        cy.root().should("not.be.empty").end();
    });
});
