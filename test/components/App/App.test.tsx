import { MemoryRouter } from "react-router-dom";
import { mount } from "@cypress/react";

import App from "@/components/App";
import pages from "@/pages";

describe("App", () => {
    const mountPage = (url: string): void => {
        mount(
            <MemoryRouter initialEntries={[url]}>
                <App />
            </MemoryRouter>
        );
    };

    it("has the header", () => {
        mountPage("/this-route-does-not-exist");
        cy.get("header").should("exist").end();
    });

    it("has the wrapper", () => {
        mountPage("/this-route-does-not-exist");
        cy.get(".components-App-App__wrap").should("exist").end();
    });

    it("has the caught pokemons page", () => {
        mountPage(pages.caught.path);
    });

    it("has the 404 Not Found error page", () => {
        mountPage("/this-route-does-not-exist");
    });

    it("has the home page", () => {
        mountPage(pages.home.path);
    });
});
