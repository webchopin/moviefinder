import { mockTmdb } from "../support/tmdb.js";

describe('Search - Home', function() {
  beforeEach(function() {
    mockTmdb();
    cy.visit('/');
    cy.get('[data-js=title]').type('batman');
    cy.wait('@search');
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
    cy.get('.movie:first-of-type .movie__title').should('contain', 'Movie 1');
    cy.get('[data-js=movie-list]').children().should('have.length', 20);
    cy.get('.loading').should('not.exist');
    cy.get('.page').should('contain', 'In Theaters');
  });
  it('switches to In Theater when clicking on home link', function() {
    cy.get('[data-js=home-link]').click();
    cy.get('[data-js=movie-list]').children().should('have.length', 20);
    cy.get('.loading').should('not.exist');
    cy.get('.page').should('contain', 'In Theaters');
  });
  it('warns when no movie is found', function() {
    cy.get('[data-js=title]').clear().type('1nonexistingmovie');
    cy.wait('@search');
    cy.get('.no-result').should('exist');
  });
});

describe('Search - Load More', function() {
  beforeEach(function() {
    mockTmdb();
    cy.visit('/');
    cy.get('[data-js=title]').type('superman');
    cy.wait('@search');
    cy.scrollTo('bottom');
  });
  it('loads 20 more movies', function() {
    cy.get('[data-js=movie-list]').children().should('have.length', 40);
  });
});
