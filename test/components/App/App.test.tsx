import App from "@/components/App";
import pages, { Page } from "@/pages";

import { getUnglobbedPath, mountPage } from "../../helpers";

Object.entries(pages).forEach(([name, page]: [string, Page]) => {
    describe(`App@${name}`, () => {
        beforeEach(() => {
            mountPage(getUnglobbedPath(page.path), <App />);
        });

        it("has the header", () => {
            cy.get("header").should("exist").end();
        });

        it("has the wrapper", () => {
            cy.get(".components-App-App__wrap").should("exist").end();
        });
    });
});
