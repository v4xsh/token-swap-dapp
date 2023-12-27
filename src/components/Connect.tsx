import React from "react";
import { useConnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const Connect = () => {
  const connector = new MetaMaskConnector();
  const { connect } = useConnect({
    connector: connector,
  });

  return (
    <button
      className="px-4 py-2 bg-purple-800 mx-auto block text-sm sm:text-xl lg:text-2xl xl:text-3xl"
      onClick={() => connect()}
    >
      Connect Wallet
    </button>
  );
};

export default Connect;
