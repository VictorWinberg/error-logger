describe("My First Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h3", "Welcome to Your Webpage");
  });
});
