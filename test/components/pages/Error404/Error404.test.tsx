import Error404 from "@/components/pages/Error404";
import pages from "@/pages";

import { mountPage } from "../../../helpers";

describe("pages/Error404", () => {
    beforeEach(() => {
        mountPage(pages.home.path, <Error404 />);
    });

    it("has something", () => {
        cy.root().should("not.be.empty").end();
    });
});
