describe('test response', function() {
  beforeEach(() => {
    cy.visit('http://localhost:3000/docs/')
  });
  
  
  it('Test some requests', function() {
    cy.get('#baseurl')
    .type('https://jsonplaceholder.typicode.com/posts');
    cy.get('#req').click();
    cy.get('#status')
    .should('contain', "Status : 200");
  });
  it('Test some requests', function() {
    cy.get('#req').click();
    cy.get('#status')
    .should('contain', "Status : 200");
  });
  it('Test some requests', function() {
    cy.get('.select-wrapper').click();
    cy.get('.dropdown-content > li:nth-child(2)').click();
    cy.get('#req').click();
    cy.get('#status')
    .should('contain', "Status : 404");
  });
  it('Test some requests', function() {
    cy.get('#baseurl')
    .type('https://jsonplaceholder.typicode.com/posts/1');
    cy.get('#req').click();
    cy.get('#status')
    .should('contain', "Status : 200");
  });
  it('Test some requests', function() {
    cy.get('#baseurl')
    .type('https://jsonplaceholder.typicode.com/posts/1/comments');
    cy.get('#req').click();
    cy.get('#status')
    .should('contain', "Status : 200");
  });
})