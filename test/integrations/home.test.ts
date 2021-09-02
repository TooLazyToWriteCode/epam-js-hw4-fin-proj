describe("The home page", () => {
    it("exists and loads", () => {
        cy.visit("/");
    });

    it("has the correct text", () => {
        cy.contains("This is the home page. Nothing to see here.");
    });
});
