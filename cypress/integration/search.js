describe('Search - Home', function() {
  before(function() {
    cy.visit('/dist/index.html');
    cy.get('[data-js=title]').type('batman');
  });
  it('shows Results page', function() {
    cy.get('.page').should('contain', 'Results');
  });
  it('shows 20 movies', function() {
    cy.get('[data-js=movie-list]').children().should('have.length', 20);
    cy.get('.loading').should('not.exist');
  });
  it('switches to In Theater when input is empty', function() {
    cy.get('[data-js=title]').clear();
    cy.get('[data-js=movie-list]').children().should('have.length', 20);
    cy.get('.loading').should('not.exist');
    cy.get('.page').should('contain', 'In Theaters');
  });
  it('switches to In Theater when clicking on home link', function() {
    cy.get('[data-js=title]').type('love');
    cy.get('[data-js=movie-list]').children().should('have.length', 20);
    cy.get('[data-js=home-link]').click();
    cy.get('[data-js=movie-list]').children().should('have.length', 20);
    cy.get('.loading').should('not.exist');
    cy.get('.page').should('contain', 'In Theaters');
  });
  it('warns when no movie is found', function() {
    cy.get('[data-js=title]').type('1nonexistingmovie');
    cy.get('.no-result').should('exist');
  });
});

describe('Search - Load More', function() {
  before(function() {
    cy.visit('/dist/index.html');
    cy.get('[data-js=title]').type('superman');
    // To avoid unnecessary API calls for each character of the input,
    // we use a delay, so here we have to wait a bit before scrolling
    cy.wait(Cypress.env('search_delay'));
    cy.scrollTo('bottom');
  });
  it('loads 20 more movies', function() {
    cy.get('[data-js=movie-list]').children().should('have.length', 40);
  });
});
