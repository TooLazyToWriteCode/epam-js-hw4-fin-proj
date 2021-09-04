import Caught from "@/components/pages/Caught";
import pages from "@/pages";

import { mountPage } from "../../../helpers/mount";
import { getNormalPath } from "../../../helpers/paths";

describe("pages/Caught", () => {
    beforeEach(() => {
        mountPage(getNormalPath(pages.home.path), <Caught />);
    });

    it("has something", () => {
        cy.root().should("not.be.empty").end();
    });
});
