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

  const { data, isError, isLoading } = useBalance({
    address,
  });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;

  if (isConnected)
    return (
      <div className="text-center block mx-auto">
        <div className="text-xs sm:text-xl lg:text-2xl xl:text-3xl flex flex-col sm:block">
          <span>Connected to</span>{" "}<span className="font-bold whitespace-normal">{ensName ?? address}</span>
        </div>
        <div className="text-xs sm:text-xl lg:text-2xl xl:text-3xl">
          Token: <span className="font-bold">{data?.symbol}</span>
        </div>
        <div className="text-xs sm:text-xl lg:text-2xl xl:text-3xl">
          Token Decimals: <span className="font-bold">{data?.decimals}</span>
        </div>
        <div className="text-xs sm:text-xl lg:text-2xl xl:text-3xl">
          Current Token Balance:{" "}
          <span className="font-bold">{data?.value.toString()}</span>
        </div>
        <div className="text-xs sm:text-xl lg:text-2xl xl:text-3xl">
          Formatted Token Balance:{" "}
          <span className="font-bold">{data?.formatted}</span>
        </div>
      </div>
    );
  return (
    <button
      className="px-4 py-2 bg-purple-800 mx-auto block text-sm sm:text-xl lg:text-2xl xl:text-3xl"
      onClick={() => connect()}
    >
      Connect Wallet
    </button>
  );
};

export default Actions;
