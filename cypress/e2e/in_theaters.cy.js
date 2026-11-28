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

describe('In Theaters - end of the list', function() {
  beforeEach(function() {
    mockTmdb({ totalPages: 2 });
    cy.visit('/');
    cy.wait('@inTheaters');
    cy.get('[data-js=movie-list]').children().should('have.length', 20);
  });
  it('says when there are no more movies', function() {
    cy.get('[data-js=end-of-list]').should('not.be.visible');

    cy.scrollTo('bottom');
    cy.wait('@inTheaters');
    cy.get('[data-js=movie-list]').children().should('have.length', 40);
    cy.get('[data-js=end-of-list]').should('be.visible').and('contain', 'No more movies');
  });
});
