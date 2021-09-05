import PokeCard from "@/components/parts/PokeCard";
import pages from "@/pages";

import { mountPage } from "../../../helpers/mount";
import { getNormalPath } from "../../../helpers/paths";

describe("parts/PokeCard", () => {
    beforeEach(() => {
        mountPage(
            getNormalPath(pages.pokemon.path),
            <PokeCard id="2365" name="noName" />
        );
    });

    it("has the correct name", () => {
        cy.root().get("h5").contains("noName").should("exist").end();
    });
});
