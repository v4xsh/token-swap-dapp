const DOMAIN: string = 'http://localhost:3000';

describe('Synpress Demo', () => {
  it('should connect to MetaMask and display wallet address', () => {
    cy.setupMetamask(
      'battle raccoon helmet please deliver keep kiss round orphan frame update message',
      {
        networkName: 'Goerli test network',
        rpcUrl: 'https://rpc.ankr.com/eth_goerli',
        chainId: 5,
        symbol: 'GoerliETH',
        isTestnet: true
      },
      'Tester@1234'
    ).then((setupFinished) => {
      expect(setupFinished).to.be.true;
    });

    cy.visit(DOMAIN + '/login');

    cy.get('#connect-btn').click();
    cy.acceptMetamaskAccess(); // <------ Synpress API

    cy.wait(1000);

    cy.get('#address').contains('0xe985EF3c939De33f979283d486743475a93e8eaC');
    cy.get('#connected').contains('YES');

    // Minting Tokens
    // cy.visit(DOMAIN + '/mint');
    // cy.get('#mintUsdcInput').type('10');
    // cy.wait(1000);
    // cy.get('#mintUsdc').click();
    // cy.confirmMetamaskTransaction();
    // cy.wait(30000);

    // cy.visit(DOMAIN + '/');
    // cy.get('#swapBToA').type('100');
    // cy.wait(2000);
    // cy.get('#submitSwapBToA').click();
    // cy.confirmMetamaskPermissionToSpend().should("be.true");

    // cy.get('#swapBToA').clear();
    cy.get('#swapBToA').type('900');
    cy.wait(2000);
    cy.get('#submitSwapBToA').click();
    cy.confirmMetamaskPermissionToSpend().should("be.true");
    cy.wait(20000);
  });
});
