describe('Fill out form', function () {
  it('add a question', function () {
    cy.visit('http://localhost:3000')
    cy.title().should('include', 'Beer Boarding')
    cy.get('.ant-btn').eq(2).click()
    cy.url().should('include', '/add')
    cy.get('form input').should('be.empty')
    cy.get("form input").eq(0).type("Fibonaccis Sequence")
    cy.get('form').submit()
    cy.url().should('include', '/success')

  })
})

describe('Delete Question', function () {
  it('delete a question', function () {
    cy.get('.ant-btn').eq(0).click()
    cy.url().should('include', '/browselist')
    cy.get('.maincard').last().should("contain", "Fibonaccis Sequence")
    cy.get('.maincard').last().should("contain", "Fibonaccis Sequence")
    cy.get('.ant-btn-danger').last().click()
    cy.get('.finalQdelete').click()
    cy.get('#navbtn').click({force: true})
    cy.get('#navbtn').click({force: true})
    cy.url().should('include', '/browselist')
    cy.get('.maincard h2').last().should("not.have.value", "Fibonaccis Sequence")
  })
})
