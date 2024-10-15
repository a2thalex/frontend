describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the correct title', () => {
    cy.get('h1').should('contain', 'Welcome to nTunz');
  });

  it('has a working navigation', () => {
    cy.get('nav').within(() => {
      cy.get('a').contains('Login').click();
    });
    cy.url().should('include', '/login');
  });

  it('changes language when selector is used', () => {
    cy.get('select.language-selector').select('es');
    cy.get('nav').within(() => {
      cy.get('a').contains('Iniciar sesión').should('be.visible');
    });
  });
});
