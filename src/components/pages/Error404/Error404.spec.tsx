import { pages } from "@/config/Pages";
import { mountPage } from "@/utilities/Test/mount";
import { getNormalPath } from "@/utilities/Test/paths";

import { Error404 } from "./Error404";

describe("pages/Error404", () => {
    beforeEach(() => {
        mountPage([getNormalPath(pages.error404.path)], <Error404 />);
    });

    it("has something", () => {
        cy.root().should("not.be.empty").end();
    });
});
