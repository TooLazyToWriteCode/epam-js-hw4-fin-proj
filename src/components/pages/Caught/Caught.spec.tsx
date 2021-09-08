import { pages } from "@/config/Pages";
import { mountPage } from "@/utilities/Test/mount";
import { getNormalPath } from "@/utilities/Test/paths";

import { Caught } from "./Caught";

describe("pages/Caught", () => {
    beforeEach(() => {
        mountPage([getNormalPath(pages.home.path)], <Caught />);
    });

    it("has something", () => {
        cy.root().should("not.be.empty").end();
    });
});
