import { MemoryRouter } from "react-router-dom";
import { mount } from "@cypress/react";

import Caught from "@/components/pages/Caught";

describe("pages/Caught", () => {
    beforeEach(() => {
        mount(
            <MemoryRouter>
                <Caught />
            </MemoryRouter>
        );
    });

    it("has something", () => {
        cy.root().should("not.be.empty").end();
    });
});
