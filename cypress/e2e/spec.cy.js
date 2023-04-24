//user flows being tested
//1.User should see the title of the app when the page loads.
//2.User should see a form displayed with an input for name and available ingredient buttons.
//3.User should be able to submit a new order as long as they enter a name and select at least one ingredient.


import orders from "../fixtures/ordersFixture"
import newOrder from "../fixtures/newOrderFixture"

describe('user flows', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', orders)
    cy.visit('http://localhost:3000/')
  })
  
  it('should have the title displayed', () => {
    cy.get('h1').contains('Burrito Builder')
  })

  it('should display a form with input/buttons', () => {
    cy.get('input').should('be.visible')

    cy.get('p').contains('Order: Nothing selected')

    cy.get('[name="beans"]').should('be.visible')
    cy.get('[name="steak"]').should('be.visible')
    cy.get('[name="carnitas"]').should('be.visible')
    cy.get('[name="sofritas"]').should('be.visible')
    cy.get('[name="lettuce"]').should('be.visible')
    cy.get('[name="queso fresco"]').should('be.visible')
    cy.get('[name="pico de gallo"]').should('be.visible')
    cy.get('[name="hot sauce"]').should('be.visible')
    cy.get('[name="guacamole"]').should('be.visible')
    cy.get('[name="jalapenos"]').should('be.visible')
    cy.get('[name="cilantro"]').should('be.visible')
    cy.get('[name="sour cream"]').should('be.visible')
   

    cy.get(':nth-child(15)').should('be.visible')
    
  })

  it('should POST new order once submit button is clicked', () => {
    cy.intercept("POST", 'http://localhost:3001/api/v1/orders', {
      status: 201,
      body: JSON.stringify(newOrder) 
    });
    cy.visit('http://localhost:3000/') 

    cy.get('input').type(newOrder.name)

    cy.get('[name="beans"]').click()
    cy.get('[name="lettuce"]').click()
    cy.get('[name="carnitas"]').click()
    cy.get('[name="queso fresco"]').click()
    cy.get('[name="jalapenos"]').click()

    cy.get(':nth-child(15)').click()

    cy.contains(newOrder.name)
  })
} )

