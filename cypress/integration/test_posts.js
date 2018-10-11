import {POSTS_REPSONSE, POSTS_URL} from "../mock.js";

describe('Test https://jsonplaceholder.typicode.com/posts ', () => {
beforeEach(() => {
  cy.visit('http://localhost:3000/docs/')
  cy.get('#baseurl')
  .type(POSTS_URL);
  cy.get('#req').click();
});


it('status OK', () => {
  cy.get('#status')
  .should('contain', "Status : 200");
});
it('exec time visible', () => {
  cy.get('#executiontime')
  .should('be.visible');
});
it('responseH not empty', () => {
  cy.get('#responseH')
  .should('not.contain', ' ');
});
it('responseB not empty', () => {
  cy.get('#responseB')
  .should('not.contain', ' ');
});
it('history elements not empty', () => {
  cy.get('#leftmenu > li > ul:nth-child(3) > li > div.row > div.col.s10.collapsible-header.white-text.blue').click();
  cy.get('#history > div > a').should('have.length', 1);
});
it('history elements cleared', () => {
  cy.get('#clearhistory').click();
  cy.get('#leftmenu > li > ul:nth-child(3) > li > div.row > div.col.s10.collapsible-header.white-text.blue').click();
  cy.get('#history > div > a').should('have.length', 0);
});
})