import orders from "../fixtures/ordersFixture"

describe('user flows', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', orders)
    cy.visit('http://localhost:3000/')
  })
  
  it('should have the title displayed', () => {
    cy.get('h1').contains('Burrito Builder')
  })

  it('should display a form with input/buttons', {
    
  })



} )

