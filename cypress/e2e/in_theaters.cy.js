import { mockTmdb } from "../support/tmdb.js";

describe('In Theaters', function() {
  beforeEach(function() {
    mockTmdb({ delay: 300 });
    cy.visit('/');
  });
  it('loads the movies', function(){
    cy.get('[data-js=page-indicator]').should('contain', 'In Theaters');
    cy.get('.loading').should('exist');
    cy.get('[data-js=movie-list]').children().should('have.length', 0);

    cy.wait('@inTheaters');
    cy.get('[data-js=movie-list]').children().should('have.length', 20);
    cy.get('.loading').should('not.exist');
  });
  it('loads 20 more on scroll', function(){
    cy.wait('@inTheaters');
    cy.get('[data-js=movie-list]').children().should('have.length', 20);

    cy.scrollTo('bottom');
    cy.get('.loading').should('exist');
    cy.wait('@inTheaters');
    cy.get('[data-js=movie-list]').children().should('have.length', 40);
    cy.get('.loading').should('not.exist');
  });
});
