import { mockTmdb } from "../support/tmdb.js";

describe('Movie', function() {
  beforeEach(function() {
    mockTmdb();
    cy.visit('/');
    cy.wait('@inTheaters');
    cy.get('[data-js=movie-list]').children().should('have.length', 20);
  });
  it('shows the basic information', function() {
    cy.get('.movie:first-of-type').within(function(){
      cy.get('.movie__img').should('exist');
      cy.get('.movie__title').should('contain', 'Movie 1');
      cy.get('.movie__release-year').should('contain', '2026');
      cy.get('.movie__genres').should('contain', 'Action');
      cy.get('.movie__vote-line').should('contain', '7.5');
      cy.get('.movie__overview').should('contain', 'Overview of movie 1');
    });
  });
  it('shows then hides the details', function() {
    cy.get('.movie:first-of-type .expand').click();
    cy.wait(['@videos', '@reviews', '@similar']);
    cy.get('.video').should('be.visible').and('contain', 'Trailer');
    cy.get('.reviews').should('be.visible').and('contain', 'Jane').and('contain', 'Great movie');
    cy.get('.similar-movies').should('be.visible').and('contain', 'Movie 9001');

    cy.get('.movie:first-of-type .minimize').click();
    cy.get('.video').should('not.be.visible');
    cy.get('.reviews').should('not.be.visible');
    cy.get('.similar-movies').should('not.be.visible');
  });
});
