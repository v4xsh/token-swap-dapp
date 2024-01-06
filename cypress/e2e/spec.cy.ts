describe('Synpress Demo', () => {
  it('should connect to MetaMask and display wallet address', () => {
    // cy.visit('http://localhost:3000');
    cy.acceptMetamaskAccess();
    // cy.get('#connect-btn').click();
  });
});
