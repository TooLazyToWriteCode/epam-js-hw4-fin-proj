import { mountPage } from "../../../helpers";
import Home from "@/components/pages/Home";
import pages from "@/pages";

describe("pages/Home", () => {
    beforeEach(() => {
        mountPage(pages.home.path, <Home />);
    });

    it("has something", () => {
        cy.root().should("not.be.empty").end();
    });
});
