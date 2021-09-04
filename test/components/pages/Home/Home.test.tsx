import Home from "@/components/pages/Home";
import pages from "@/pages";

import { mountPage } from "../../../helpers";

describe("pages/Home", () => {
    beforeEach(() => {
        mountPage(pages.home.path, <Home />);
    });

    it("has something", () => {
        cy.root().should("not.be.empty").end();
    });
});
