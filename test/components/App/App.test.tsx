import App from "@/components/App";
import pages, { Page } from "@/pages";

import { mountPage } from "../../helpers/mount";
import { goThroughPages } from "../../helpers/pages";
import { getNormalPath } from "../../helpers/paths";

goThroughPages((name, page) => {
    describe(`App@${name}`, () => {
        beforeEach(() => {
            mountPage(getNormalPath(page.path), <App />);
        });

        it("has the header", () => {
            cy.get("header").should("exist").end();
        });

        it("has the wrapper", () => {
            cy.get(".components-App-App__wrap").should("exist").end();
        });
    });
});
