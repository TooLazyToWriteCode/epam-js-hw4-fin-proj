import { MemoryRouter } from "react-router-dom";
import { mount } from "@cypress/react";

import Error404 from "@/components/pages/Error404";

describe("pages/Error404", () => {
    beforeEach(() => {
        mount(
            <MemoryRouter>
                <Error404 />
            </MemoryRouter>
        );
    });

    it("has something", () => {
        cy.root().should("not.be.empty");
    });
});
