import { mockTmdb } from "../support/tmdb.js";

describe('Movie - basic information', function() {
  beforeEach(function() {
    mockTmdb();
    cy.visit('/');
    cy.get('[data-js=movie-list]').children().should('have.length', 20);
  });
  it('shows an image', function() {
    cy.get('.movie:first-of-type .movie__img').should('exist');
  });
  it('shows a title', function() {
    cy.get('.movie:first-of-type .movie__title').should('exist');
  });
  it('shows a release year', function() {
    cy.get('.movie:first-of-type .movie__release-year').should('exist');
  });
  it('shows genres', function() {
    cy.get('.movie:first-of-type .movie__genres').should('exist');
  });
  it('shows a vote', function() {
    cy.get('.movie:first-of-type .movie__vote-line').should('exist');
  });
  it('shows an overview', function() {
    cy.get('.movie:first-of-type .movie__overview').should('exist');
  });
});

describe('Movie - details', function() {
  beforeEach(function() {
    mockTmdb();
    cy.visit('/');
    cy.get('[data-js=movie-list]').children().should('have.length', 20);
    cy.get('.movie:first-of-type .expand').click();
    cy.wait(['@videos', '@reviews', '@similar']);
  });
  describe('Click to show details', function() {
    it('shows a video', function() {
      cy.get('.video').should('be.visible');
    });
    it('shows a reviews div', function() {
      cy.get('.reviews').should('be.visible');
    });
    it('shows a similar movies div', function() {
      cy.get('.similar-movies').should('be.visible');
    });
  });
  describe('Click to hide details', function() {
    beforeEach(function() {
      cy.get('.movie:first-of-type .minimize').click();
    });
    it('hides the video', function() {
      cy.get('.video').should('not.be.visible');
    });
    it('hides the reviews div', function() {
      cy.get('.reviews').should('not.be.visible');
    });
    it('hides the similar movies div', function() {
      cy.get('.similar-movies').should('not.be.visible');
    });
  });
});
