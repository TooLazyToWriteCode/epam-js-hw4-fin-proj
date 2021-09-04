import { mountPage } from "../../../helpers";
import Caught from "@/components/pages/Caught";
import pages from "@/pages";

describe("pages/Caught", () => {
    beforeEach(() => {
        mountPage(pages.home.path, <Caught />);
    });

    it("has something", () => {
        cy.root().should("not.be.empty").end();
    });
});
