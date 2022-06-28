describe("[RxJS-React-Demo] - User Flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.intercept("GET", "https://reqres.in/api/users", {
      statusCode: 200,
      body: {
        data: [
          {
            id: 1,
            email: "george.bluth@reqres.in",
            first_name: "George",
            last_name: "Bluth",
            avatar: "https://reqres.in/img/faces/1-image.jpg",
            age: 23,
          },
          {
            id: 2,
            email: "janet.weaver@reqres.in",
            first_name: "Janet",
            last_name: "Weaver",
            avatar: "https://reqres.in/img/faces/2-image.jpg",
            age: 35,
          },
          {
            id: 3,
            email: "emma.wong@reqres.in",
            first_name: "Emma",
            last_name: "Wong",
            avatar: "https://reqres.in/img/faces/3-image.jpg",
            age: 25,
          },
        ],
      },
    }).as("getUsers");
  });

  it("should render page with no selected user by default", () => {
    cy.getByTestId("selected-user").should("contain", "None");
  });

  it("should increment user age when click on increment button", () => {
    cy.getByTestId("increment-age-button").first().click();
    cy.getByTestId("age").should("contain", "24");
  });

  it("should assign user to selected user when click on select button", () => {
    cy.getByTestId("select-user-button").first().click();
    cy.getByTestId("selected-user").should("contain", "George Bluth");
  });

  it("should set selected user and icrement age when click on increment button", () => {
    cy.getByTestId("select-user-button").first().click();
    cy.getByTestId("increment-age-button").first().click();
    cy.getByTestId("age").should("contain", "24");
    cy.getByTestId("selected-user").should("contain", "24");
  });

  it("should increment user age and keep selected user None when click on increment button", () => {
    cy.getByTestId("increment-age-button").first().click();
    cy.getByTestId("age").should("contain", "24");
    cy.getByTestId("selected-user").should("contain", "None");
  });
});
