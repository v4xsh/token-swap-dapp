console.log('yoyoyoyoyo');
describe('Synpress Demo', () => {
  beforeEach(() => {
    cy.setupMetamask();
    cy.changeMetamaskNetwork('localhost')
    cy.visit('/')
  });

  it('should connect to MetaMask and display wallet address', () => {
    cy.visit('http://localhost:3000   /');
    cy.get('#address').contains('??');
    cy.get('#connected').contains('NO');

    cy.get('#connect-btn').click();
    cy.acceptMetamaskAccess(); // <------ Synpress API

    cy.get('#address').contains('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
    cy.get('#connected').contains('YES');

    cy.get('#disconnect-btn').click();
    cy.get('#address').contains('??');
    cy.get('#connected').contains('NO');
  });
});
