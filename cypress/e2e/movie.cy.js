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
      cy.get('.movie__img')
        .should('have.attr', 'alt', 'Poster of Movie 1')
        .and('have.attr', 'loading', 'lazy');
      cy.get('.movie__title').should('contain', 'Movie 1');
      cy.get('.movie__release-year').should('contain', '2026');
      cy.get('.movie__genres').should('contain', 'Action');
      cy.get('.movie__vote-line').should('contain', '7.5');
      cy.get('.movie__overview').should('contain', 'Overview of movie 1');
    });
  });
  it('shows a focus ring on the details button when reached with the keyboard', function() {
    cy.get('[data-js=title]').focus();
    cy.press(Cypress.Keyboard.Keys.TAB);
    cy.focused().should('have.attr', 'data-js', 'toggle-details').and('have.css', 'outline-style', 'solid');
  });
  it('shows then hides the details', function() {
    cy.get('.movie:first-of-type [data-js=toggle-details]').as('toggle')
      .should('have.attr', 'aria-expanded', 'false')
      .and('have.attr', 'aria-controls', 'movie-1-details');
    cy.get('#movie-1-details').should('have.attr', 'data-js', 'details');

    cy.get('@toggle').click();
    cy.wait('@movieDetails');
    cy.get('@toggle').should('have.attr', 'aria-expanded', 'true');
    cy.get('.video').should('be.visible').and('contain', 'Trailer');
    cy.get('.video__player').should('have.attr', 'title', 'Trailer');
    cy.get('.reviews').should('be.visible').and('contain', 'Jane').and('contain', 'Great movie');
    cy.get('.similar-movies').should('be.visible').and('contain', 'Movie 9001');

    cy.get('@toggle').click();
    cy.get('@toggle').should('have.attr', 'aria-expanded', 'false').and('have.focus');
    cy.get('.video').should('not.be.visible');
    cy.get('.reviews').should('not.be.visible');
    cy.get('.similar-movies').should('not.be.visible');
  });
  it('keeps the details open when they are reopened during the closing animation', function() {
    cy.get('.movie:first-of-type [data-js=toggle-details]').as('toggle').click();
    cy.wait('@movieDetails');
    cy.get('.video').should('be.visible');

    // Control the page's timers, to reopen before the 300 ms closing animation ends
    cy.clock();
    cy.get('@toggle').click();
    cy.tick(100);
    cy.get('@toggle').click();
    cy.tick(500);
    cy.get('@toggle').should('have.attr', 'aria-expanded', 'true');
    cy.get('.video').should('be.visible');
  });
});
