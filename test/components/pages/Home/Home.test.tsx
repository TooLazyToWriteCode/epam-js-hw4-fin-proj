import Home from "@/components/pages/Home";
import pages from "@/pages";

import { mountPage } from "../../../helpers/mount";
import { getNormalPath } from "../../../helpers/paths";

describe("pages/Home", () => {
    beforeEach(() => {
        mountPage(getNormalPath(pages.home.path), <Home />);
    });

    it("has something", () => {
        cy.root().should("not.be.empty").end();
    });
});
