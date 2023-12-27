import React from "react";

import "@/styles/globals.css";

import type { AppProps } from "next/app";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, mainnet, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

export default function App({ Component, pageProps }: AppProps) {
  const { publicClient } = configureChains(
    [goerli],
    [publicProvider()]
  );

  const config = createConfig({
    // autoConnect: true,
    publicClient,
  });
  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
