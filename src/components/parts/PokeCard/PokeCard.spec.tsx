import { pages } from "@/config/Pages";
import { mountPage } from "@/utilities/Test/mount";
import { getNormalPath } from "@/utilities/Test/paths";

import { PokeCard } from "./PokeCard";

describe("parts/PokeCard", () => {
    beforeEach(() => {
        mountPage(
            [getNormalPath(pages.pokemon.path)],
            <PokeCard pokemon={{ id: "2365", name: "noName" }} />
        );
    });

    it("has the correct name", () => {
        cy.root().get("h5").contains("noName").should("exist").end();
    });
});
