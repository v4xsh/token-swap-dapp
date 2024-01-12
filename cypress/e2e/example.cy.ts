const DOMAIN: string = 'http://localhost:3000';

describe('Synpress Demo', () => {
  it('should connect to MetaMask and display wallet address', () => {
    cy.setupMetamask(
      'dynamic broom defense diamond dragon busy naive avoid arch junk endless myself',
      // 'battle raccoon helmet please deliver keep kiss round orphan frame update message',
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

    cy.wait(2000);

    cy.get('#address').contains('0x9A32D61b1b1faB740600d3CB8a3072765B62900D');
    cy.get('#connected').contains('YES');

    cy.visit(DOMAIN + '/mint');
    cy.get('#mintUsdcInput').type('10');
    cy.get('#mintUsdc').click();
    // cy.get('#mintUsdc').click();
    cy.wait(7000);
    cy.isMetamaskWindowActive().should("be.true");
    cy.confirmMetamaskTransaction();
    // cy.confirmMetamaskPermissionToSpend('10').should('be.true');


    cy.visit(DOMAIN + '/');
    cy.get('#swapBToA').type('1000');
    // cy.get('#submitSwapBToA').click();
    // cy.confirmMetamaskPermissionToSpend().should('be.true');

    cy.wait(30000000);

    // cy.get('#disconnect-btn').click();
  });
});
