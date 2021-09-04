import { mount } from "@cypress/react";

import App from "@/components/App";

describe("App", () => {
    beforeEach(() => {
        mount(App);
    });

    it("has something", () => {
        cy.root().should("not.be.empty");
    });

    it("has the wrapper", () => {
        cy.get(".components-App-App__wrap").should("exist");
    });
});
