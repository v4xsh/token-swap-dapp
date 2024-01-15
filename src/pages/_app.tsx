import React from 'react';

import '@/styles/globals.css';

import type { AppProps } from 'next/app';

import { WagmiConfig, createConfig } from 'wagmi';
import { goerli } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { createPublicClient, http } from 'viem';

// export const { publicClient } = createPublicClient([goerli], [publicProvider()]);
export const publicClient = createPublicClient({
  chain: goerli,
  transport: http()
});

export default function App ({
  Component,
  pageProps
}: AppProps): React.JSX.Element {
  const config = createConfig({
    autoConnect: true,
    publicClient,
    connectors: [new MetaMaskConnector()]
  });

  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
