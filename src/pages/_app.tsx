import React from "react";

import "@/styles/globals.css";

import type { AppProps } from "next/app";

import { configureChains, WagmiConfig, createConfig } from "wagmi";
import { goerli, mainnet, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

export default function App({ Component, pageProps }: AppProps) {
  const { publicClient } = configureChains([goerli], [publicProvider()]);

  const config = createConfig({
    autoConnect: true, // Set Dynmaic Imports
    publicClient,
    connectors: [new MetaMaskConnector()],
  });
  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
