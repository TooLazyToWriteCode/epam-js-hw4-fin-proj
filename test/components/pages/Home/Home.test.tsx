import { MemoryRouter } from "react-router-dom";
import { mount } from "@cypress/react";

import Home from "@/components/pages/Home";

describe("pages/Home", () => {
    beforeEach(() => {
        mount(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
    });

    it("has something", () => {
        cy.root().should("not.be.empty").end();
    });
});
