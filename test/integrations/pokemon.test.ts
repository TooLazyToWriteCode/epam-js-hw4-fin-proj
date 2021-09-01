describe("The pokemon information page", () => {
    it("exists and loads", () => {
        cy.visit("/pokemon/1");
    });
});
