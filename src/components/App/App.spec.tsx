import { App } from "./App";

import { mountPage } from "@/utilities/Test/mount";
import { getNormalPath } from "@/utilities/Test/paths";
import { goThroughPages } from "@/utilities/Test/pages";

goThroughPages((name, page) => {
    describe(`App@${name}`, () => {
        beforeEach(() => {
            mountPage([getNormalPath(page.path)], <App />);
        });

        it("has the header", () => {
            cy.get("header").should("exist").end();
        });
    });
});
