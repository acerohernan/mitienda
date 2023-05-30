/// <reference types="cypress" />

describe("Page /login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display a email input", () => {
    cy.get("input[name=email]").should("be.visible");
  });

  it("should display a password input", () => {
    cy.get("input[name=password]").should("be.visible");
  });

  it("should display a submit button with 'Login' text", () => {
    cy.get("button").contains("Login").should("be.visible");
  });

  it("should display a link that redirects to /signup", () => {
    /* Click the link */
    cy.get("a").contains("Create an account").should("be.visible").click();

    /* Wait some miliseconds */
    cy.wait(500); // 0.5 seconds

    /* Verify the new link */
    cy.url().should("include", "/signup");
  });

  it("should complete the login flow", () => {
    const email = "demo@demo.com";
    const password = "Password1";

    /* Write the email */
    cy.get("input[name=email]").type(email);

    /* Write the password */
    cy.get("input[name=password]").type(password);

    /* Click the submit button */
    cy.get("button").contains("Login").click();

    /* Await the response of the API */
    cy.wait(1000); // 1 second

    /* Should redirect to /admin page */
    cy.url().should("include", "/admin");
  });
});
