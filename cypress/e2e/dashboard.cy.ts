const user = {
  name: "Anisur Rahman",
  email: "pshakilwizard@gmail.com",
  password: "Kairos1!",
  age: 25,
};

describe("Dashboard", () => {
  before(() => {
    cy.visit("/login");
    cy.login(user.email, user.password);
  });

  it("Header should have logout button", () => {
    cy.get("button.btn");
  });

  it("Click on Public Profile Url button should show toast with copy link meesage", () => {
    cy.get("button.button.is-info").contains("Public Profile URL").click();
    cy.get(".Toastify__toast-container").contains("Copied to clipboard");
  });

  it("Click profile edit icon should show a modal with profile update form", () => {
    cy.get("button#EDIT_PROFILE").click();
    cy.get(".modal.is-active");
    cy.get(".modal-close").click({ multiple: true, force: true });
  });

  it("profile update modal form button should disabled by default", () => {
    cy.get("button#EDIT_PROFILE").click();
    cy.get(".modal.is-active");
    cy.get(".button.is-primary").contains("Update").should("be.disabled");
    cy.get(".modal-close").click({ multiple: true, force: true });
  });

  it("Email input should be disabled in profile update modal form ", () => {
    cy.get("button#EDIT_PROFILE").click();
    cy.get(".modal.is-active");
    cy.get("input[name='email']").should("be.disabled");
    cy.get(".modal-close").click({ multiple: true, force: true });
  });

  it("Name and email input should contains existing value", () => {
    cy.get("button#EDIT_PROFILE").click();
    cy.get(".modal.is-active");
    cy.get("input[name='email']").should("have.value", user.email);
    cy.get("input[name='name']").should("have.value", user.name);
    cy.get(".modal-close").click({ multiple: true, force: true });
  });

  it("Update profile age and check updated result in dashboard", () => {
    cy.get("button#EDIT_PROFILE").click();
    cy.get(".modal.is-active");
    cy.get("input[name='age']").clear();
    cy.get("input[name='age']").type(user.age);
    cy.get(".button.is-primary").contains("Update").click();
    cy.get(".tag.is-dark").contains(`Age: ${user.age}`);
  });

  it("Add Work experience should open a modal", () => {
    cy.get("button.is-primary").contains("Add Experience").click();
    cy.get(".modal.is-active");
    cy.get(".modal-close").click({ multiple: true, force: true });
  });

  it("Required name in add Work experience form ", () => {
    cy.get("button.is-primary").contains("Add Experience").click();
    cy.get(".modal.is-active");
    cy.get(".button.is-primary")
      .contains("Save")
      .click({ multiple: true, force: true });
    cy.get(".field").contains("Company").next().contains("Name is required");
    cy.get(".modal-close").click({ multiple: true, force: true });
  });

  it("End Date should be after start date", () => {
    cy.get("button.is-primary").contains("Add Experience").click();
    cy.get(".modal.is-active");
    cy.get("input[name='start_date']").click({ multiple: true, force: true });
    cy.get("input[name='end_date']").click({ multiple: true, force: true });
    cy.get(".button.is-primary")
      .contains("Save")
      .click({ multiple: true, force: true });
    cy.get(".field")
      .contains("End Date")
      .next()
      .contains("End date must be after start date");
    cy.get(".modal-close").click({ multiple: true, force: true });
  });
});
