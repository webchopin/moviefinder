import { mockTmdb } from "../support/tmdb.js";

describe('Home - General', function() {
  beforeEach(function() {
    mockTmdb();
    cy.visit('/');
  });
  it('shows the page layout', function(){
    cy.get('.logo').should('exist');
    cy.get('.movie-form__input').should('exist');
    cy.get('.site-title').should('exist');
  });
  it('shows the TMDB attribution', function() {
    cy.get('.attribution__logo').should('exist');
    cy.get('.attribution__text').should('contain', 'This product uses the TMDb API but is not endorsed or certified by TMDb.');
  });
});
