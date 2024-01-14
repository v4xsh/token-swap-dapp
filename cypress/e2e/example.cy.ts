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
    cy.wait(1000);
    cy.get('#mintUsdc').click();
    cy.confirmMetamaskTransaction();
    cy.wait(30000);
  });
});
