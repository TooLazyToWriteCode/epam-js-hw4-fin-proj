describe("The home page", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("has the link to the caught pokemons page in the header", () => {
        cy.get("header").contains("Caught Pokemons").should("exist").click();
        cy.location("pathname").should("eq", "/caught").end();
    });

    it("has the link to the home page in the header", () => {
        cy.get("header").contains("Home").should("exist").click();
        cy.location("pathname").should("eq", "/").end();
    });
});
