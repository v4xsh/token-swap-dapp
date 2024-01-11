const DOMAIN: string = 'http://localhost:3000';

describe('Synpress Demo', () => {
  it('should connect to MetaMask and display wallet address', () => {
    cy.setupMetamask(
      'battle raccoon helmet please deliver keep kiss round orphan frame update message',
      {
        networkName: process.env.NETWORK_NAME as string,
        rpcUrl: process.env.RPC_URL as string,
        chainId: Number(process.env.CHAIN_ID) as number,
        symbol: process.env.SYMBOL,
        // blockExplorer: 'https://etherscan.io/',
        isTestnet: true
      },
      'Tester@1234'
    ).then((setupFinished) => {
      expect(setupFinished).to.be.true;
    });

    cy.visit(DOMAIN + '/login');

    cy.get('#connect-btn').click();
    cy.acceptMetamaskAccess(); // <------ Synpress API

    cy.wait(2000);

    cy.get('#address').contains('0xe985EF3c939De33f979283d486743475a93e8eaC');
    cy.get('#connected').contains('YES');

    cy.visit(DOMAIN + '/mint');
    cy.get('#mintUsdcInput').type('1000');
    cy.get('#mintUsdc').click();
    // cy.confirmMetamaskTransaction()
    cy.confirmMetamaskPermissionToSpend().should('be.true');

    cy.wait(100000);

    cy.visit(DOMAIN + '/');
    cy.get('#swapBToA').type('1000');
    // cy.get('#submitSwapBToA').click();
    // cy.confirmMetamaskPermissionToSpend().should('be.true');

    cy.wait(30000000);

    // cy.get('#disconnect-btn').click();
  });
});
