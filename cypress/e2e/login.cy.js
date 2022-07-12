describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Should login button disabled by default", () => {
    cy.get("button").should("be.disabled");
  });

  it("Should login button enabled if inputs are filed", () => {
    cy.get('input[name="email"]').type("Fake@gmail.com");
    cy.get('input[name="password"]').type("FakePassWord");
    cy.get("button").should("not.be.disabled");
  });

  it("Email Input should show invalidation message", () => {
    cy.get('input[name="email"]').type("Fake");
    cy.get("p.help.is-danger").contains("Please enter a valid email");
  });

  it("Email Input should show invalidation message", () => {
    cy.get('input[name="password"]').type("12");
    cy.get("p.help.is-danger").contains(
      "Password must have at least 8 characters"
    );
  });

  it("Login with invalid credentials should show error toast", () => {
    cy.login("Fake@gmail.com", "FakePassWord");
    cy.get(".Toastify__toast-container");
  });

  it("Enter to Dashboard with valid credentials", () => {
    cy.login("pshakilwizard@gmail.com", "Kairos1!");
    cy.location("pathname").should("eq", "/");
  });

  it("Login should have user token on localstorage", () => {
    cy.login("pshakilwizard@gmail.com", "Kairos1!").should(() => {
      expect(localStorage.getItem("user")).contain("token");
    });
  });
});
