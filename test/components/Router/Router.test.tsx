import { mount } from "@cypress/react";

import Router from "@/components/Router";

describe("Router", () => {
    beforeEach(() => {
        mount(<Router />);
    });

    it("has something", () => {
        cy.root().should("not.be.empty");
    });
});
