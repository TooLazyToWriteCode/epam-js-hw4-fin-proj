import { mountPage } from "@/utilities/Test/mount";
import { goThroughPages } from "@/utilities/Test/pages";
import { getNormalPath } from "@/utilities/Test/paths";

import { App } from "./App";

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
