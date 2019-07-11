describe('In Theaters - Home', function() {
  beforeEach(function() {
    cy.visit('/dist/index.html');
  });
  it('shows In Theaters page', function() {
    cy.get('[data-js=page-indicator]').should('contain', 'In Theaters');
  });
  it('has no movies at the beginning', function() {
    cy.get('[data-js=movie-list]').children({timeout:0}).should('have.length', 0);
  });
  it('shows a loading spinner', function() {
    cy.get('.loading').should('exist');
  });
  it('shows 20 movies', function() {
    cy.get('[data-js=movie-list]').children().should('have.length', 20);
    cy.get('.loading').should('not.exist');
  });
});

describe('In Theaters - Load More', function() {
  before(function() {
    cy.visit('/dist/index.html');
    cy.get('[data-js=movie-list]').children().should('have.length', 20);
    cy.scrollTo('bottom');
  });
  it('shows a loading spinner', function() {
    cy.get('.loading').should('exist');
  });
  it('loads 20 more movies', function() {
    cy.get('[data-js=movie-list]').children().should('have.length', 40);
  });
});
