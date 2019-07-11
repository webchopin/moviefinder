describe('Home - General', function() {
  before(function() {
    cy.visit('/dist/index.html');
  });
  it('has the site logo', function() {
    cy.get('.logo').should('exist');
  });
  it('has a search bar', function() {
    cy.get('.movie-form__input').should('exist');
  });
  it('has the site title', function() {
    cy.get('.site-title').should('exist');
  });
  it('has TMDB attribution', function() {
    cy.get('.attribution__logo').should('exist');
    cy.get('.attribution__text').should('contain', 'This product uses the TMDb API but is not endorsed or certified by TMDb.');
  });
});
