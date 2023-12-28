import React from "react";
import { useAccount, useBalance } from "wagmi";
import { AccountType } from "../../types/AccountType";

const Actions = ({ address }: AccountType) => {
  const { data, isError, isLoading } = useBalance({
    address,
  });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;

    return (
      <div className="text-center block mx-auto">
        <div className="text-xs sm:text-xl lg:text-2xl xl:text-3xl flex flex-col sm:block">
          <span>Connected to</span>{" "}
          <span className="font-bold whitespace-normal">{address}</span>
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
};

export default Actions;
