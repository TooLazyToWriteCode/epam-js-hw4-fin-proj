import { mount } from "@cypress/react";

import Router from "@/components/Router";

describe("Router", () => {
    it("mounts without errors", () => {
        mount(<Router />);
        cy.get(".components-Router-Router__wrap").should("exist");
    });
});
