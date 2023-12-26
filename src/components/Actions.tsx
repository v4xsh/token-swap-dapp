import React from "react";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const Actions = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const connector = new MetaMaskConnector();
  const { connect } = useConnect({
    connector: connector,
  });

  if (isConnected) return <div>Connected to {ensName ?? address}</div>;
  return <button onClick={() => connect()}>Connect Wallet</button>;
};

export default Actions;
