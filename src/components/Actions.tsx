import React from "react";
import { useAccount, useBalance, useConnect, useEnsName } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const Actions = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const connector = new MetaMaskConnector();
  const { connect } = useConnect({
    connector: connector,
  });

  const {
    data,
    isError,
    isLoading,
  } = useBalance({
    address,
  });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;

  if (isConnected)
    return (
      <div>
        <div>Connected to {ensName ?? address}</div>
        <div>Token: {data?.symbol}</div>
        <div>Token Decimals: {data?.decimals}</div>
        <div>Current Token Balance: {data?.value.toString()}</div>
      </div>
    );
  return <button onClick={() => connect()}>Connect Wallet</button>;
};

export default Actions;
