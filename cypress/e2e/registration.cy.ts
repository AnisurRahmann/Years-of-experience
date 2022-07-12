describe("Registration", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/registration");
  });

  it("Should login button disabled by default", () => {
    cy.get("button").should("be.disabled");
  });

  it("Should login button enabled if inputs are filed", () => {
    cy.get('input[name="name"]').type("fakeName");
    cy.get('input[name="email"]').type("Fake@gmail.com");
    cy.get('input[name="password"]').type("Kairos!1");
    cy.get('input[name="confirmPassword"]').type("Kairos!1");
    cy.get("button").should("not.be.disabled");
  });

  it("Email Input should show invalidation message", () => {
    cy.get('input[name="email"]').type("Fake");
    cy.get("p.help.is-danger").contains("Please enter a valid email");
  });

  it("Name Input should show invalidation message", () => {
    cy.get('input[name="name"]').type("2Fake");
    cy.get("p.help.is-danger");
  });

  it("password Input should show invalidation message", () => {
    cy.get('input[name="password"]').type("2Fake");
    cy.get("p.help.is-danger").contains(
      "Password must have at least 8 characters"
    );
    cy.get('input[name="password"]').type("2Fake");
    cy.get("p.help.is-danger").contains(
      "Must include uppercase and lowercase letters, a number and a special character. Allowed special characters"
    );
  });

  it("It should show password do not match error", () => {
    cy.get('input[name="password"]').type("kairos!1");
    cy.get('input[name="confirmPassword"]').type("kairos");
    cy.get("p.help.is-danger").contains("The passwords do not match");
  });

  it("Toast errors should show error for existing email", () => {
    cy.get('input[name="name"]').type("fakeName");
    cy.get('input[name="email"]').type("pshakilwizard@gmail.com");
    cy.get('input[name="password"]').type("Kairos!1");
    cy.get('input[name="confirmPassword"]').type("Kairos!1");
    cy.get("button").click();
    cy.get(".Toastify__toast-container").contains(
      "User with email pshakilwizard@gmail.com already exists"
    );
  });
});
