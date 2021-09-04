import Error404 from "@/components/pages/Error404";
import pages from "@/pages";

import { mountPage } from "../../../helpers/mount";
import { getNormalPath } from "../../../helpers/paths";

describe("pages/Error404", () => {
    beforeEach(() => {
        mountPage(getNormalPath(pages.error404.path), <Error404 />);
    });

    it("has something", () => {
        cy.root().should("not.be.empty").end();
    });
});
