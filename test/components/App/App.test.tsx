import { mount } from "@cypress/react";

import App from "@/components/App";

describe("App", () => {
    it("mounts without errors", () => {
        mount(App);
        cy.get(".components-App-App__wrap").should("exist");
    });
});
