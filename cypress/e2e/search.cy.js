import { mockTmdb } from "../support/tmdb.js";

describe('Search', function() {
  beforeEach(function() {
    mockTmdb();
    cy.visit('/');
    cy.wait('@inTheaters');
    cy.get('[data-js=movie-list]').children().should('have.length', 20);
    cy.get('[data-js=title]').type('batman');
    cy.wait('@search');
  });
  it('shows the results', function() {
    cy.get('[data-js=page-indicator]').should('contain', 'Results');
    cy.get('.movie:first-of-type .movie__title').should('contain', 'Movie 1001');
    cy.get('[data-js=movie-list]').children().should('have.length', 20);
    cy.get('.loading').should('not.exist');
  });
  it('loads 20 more results on scroll', function() {
    cy.get('[data-js=movie-list]').children().should('have.length', 20);
    cy.scrollTo('bottom');
    cy.wait('@search');
    cy.get('[data-js=movie-list]').children().should('have.length', 40);
    cy.get('.loading').should('not.exist');
  });
  it('goes back to In Theater when the input is cleared', function() {
    cy.get('[data-js=title]').clear();
    cy.get('[data-js=page-indicator]').should('contain', 'In Theaters');
    cy.get('.movie:first-of-type .movie__title').should('contain', 'Movie 1');
    cy.get('[data-js=movie-list]').children().should('have.length', 20);
    cy.get('.loading').should('not.exist');
  });
  it('goes back to In Theater when the home link is clicked', function() {
    cy.get('[data-js=home-link]').click();
    cy.get('[data-js=page-indicator]').should('contain', 'In Theaters');
    cy.get('[data-js=movie-list]').children().should('have.length', 20);
    cy.get('.loading').should('not.exist');
  });
  it('warns when no movie is found', function() {
    cy.get('[data-js=title]').clear().type('1nonexistingmovie');
    cy.wait('@search');
    cy.get('.no-result').should('exist');
  });
});
