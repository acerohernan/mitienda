/// <reference types="cypress" />

describe("Page /signup", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("should display a email input", () => {
    cy.get("input[name=email]").should("be.visible");
  });

  it("should display a password input", () => {
    cy.get("input[name=password]").should("be.visible");
  });

  it("should display a phone input", () => {
    cy.get("input[name=phone]").should("be.visible");
  });

  it("should display a submit button with 'Create account' text", () => {
    cy.contains("Create account").should("be.visible");
  });

  it("should complete the signup flow", () => {
    const email = `${Date.now()}@demo.com`;
    const password = "Password1";
    const phone = "999113934";

    /* Write the email */
    cy.get("input[name=email]").type(email);

    /* Write the password */
    cy.get("input[name=password]").type(password);

    /* Write the phone number */
    cy.get("input[name=phone]").type(phone);

    /* Click the submit button */
    cy.get("button").contains("Create account").click();

    /* Await the response of the API */
    cy.wait(1000); // 1 second

    /* Should redirect to /login page */
    cy.url().should("include", "/login");
  });
});
