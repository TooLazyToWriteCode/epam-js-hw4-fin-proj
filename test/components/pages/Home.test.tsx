import { mount } from "@cypress/react";

import Home from "@/components/pages/Home";

describe("pages/Home", () => {
    it("mounts without errors", () => {
        mount(<Home />);
        cy.get("span").should("exist");
    });

    it("has the correct text", () => {
        mount(<Home />);
        cy.get("span").contains("This is the home page. Nothing to see here.");
    });
});
