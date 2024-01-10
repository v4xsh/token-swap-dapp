console.log('yoyoyoyoyo');
describe('Synpress Demo', () => {
  it('should connect to MetaMask and display wallet address', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('#connect-btn').click();
    cy.acceptMetamaskAccess(); // <------ Synpress API

    cy.wait(2000);

    cy.get('#address').contains('0xe985EF3c939De33f979283d486743475a93e8eaC');
    cy.get('#connected').contains('YES');

    cy.get('#disconnect-btn').click();
  });
});
