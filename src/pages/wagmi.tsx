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
  return (
    <WagmiConfig config={config}>
      <div className="m-5 sm:m-10 lg:m-20 xl:m-36 bg-purple-600 p-3 sm:p-5 lg:p-10 xl:p-36">
        <Actions />
      </div>
    </WagmiConfig>
  );
};

export default Wagmi;
