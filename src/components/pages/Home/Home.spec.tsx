import { pages } from "@/config/Pages";
import { mountPage } from "@/utilities/Test/mount";
import { getNormalPath } from "@/utilities/Test/paths";

import { Home } from "./Home";

describe("pages/Home", () => {
    beforeEach(() => {
        mountPage([getNormalPath(pages.home.path)], <Home />);
    });

    it("has something", () => {
        cy.root().should("not.be.empty").end();
    });
});
