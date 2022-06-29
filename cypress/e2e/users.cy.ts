describe("[RxJS-React-Demo] - User Flow", () => {
  const FIRST_USER = {
    id: 1,
    name: "George",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
    age: 23,
  };
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.intercept("GET", "http://localhost:3200/users", {
      statusCode: 200,
      body: [
        FIRST_USER,
          {
            id: 2,
          name: "Janet",
            avatar: "https://reqres.in/img/faces/2-image.jpg",
            age: 35,
          },
          {
            id: 3,
          name: "Emma",
            avatar: "https://reqres.in/img/faces/3-image.jpg",
            age: 25,
          },
        ],
    }).as("fake getUsers");
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
    cy.getByTestId("selected-user").should("contain", FIRST_USER.name);
  });

  it("should set selected user and increment age when click on increment button", () => {
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
