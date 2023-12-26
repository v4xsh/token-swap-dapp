import Actions from "@/components/Actions";
import React from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygonMumbai],
  [publicProvider()]
);

const config = createConfig({
  publicClient,
  webSocketPublicClient,
});

const Wagmi = () => {
  return <WagmiConfig config={config}>
    <Actions />
  </WagmiConfig>;
};

export default Wagmi;
