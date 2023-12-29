import React, { useEffect, useState } from "react";
import { useContractReads, useContractWrite } from "wagmi";
import Susd from "../../abi/susd.json";
import { useTokenStore } from "../../store/useTokenStore";

const MintSUSD = () => {
  const { address: walletAddress } = useTokenStore();

  const [susdMintAmount, setSusdMintAmount] = useState(0);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: process.env.NEXT_PUBLIC_SUSD_ADDRESS as `0x${string}`,
    abi: Susd,
    functionName: "mint",
    args: [susdMintAmount],
  });

  const susdTokenContract = {
    address: process.env.NEXT_PUBLIC_SUSD_ADDRESS as `0x${string}`,
    abi: Susd,
  };

  const {
    data: readTokenData,
    isError,
    isLoading: isLoadingTokenData,
  } = useContractReads({
    contracts: [
      {
        ...susdTokenContract,
        functionName: "name",
      },
      {
        ...susdTokenContract,
        functionName: "symbol",
      },
      {
        ...susdTokenContract,
        functionName: "balanceOf",
        args: [walletAddress as `0x${string}`],
      },
    ],
    watch: true,
  });

  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenCurrBalance, setTokenCurrBalance] = useState("");

  useEffect(() => {
    if (readTokenData) {
      setTokenSymbol(readTokenData[0].result);
      setTokenName(readTokenData[1].result);
      setTokenCurrBalance(readTokenData[2].result.toString().slice(0,9));
    }
  }, [readTokenData]);

  return (
    <div className="flex items-center flex-col gap-3">
      <div>
        {tokenName}
        {" - "}
        {tokenSymbol}
      </div>
      <div>Balance: {tokenCurrBalance}</div>
      <input
        type="number"
        onChange={(e) => setSusdMintAmount(parseFloat(e.target.value))}
        value={susdMintAmount}
        className="text-black px-5 py-2 text-xl"
      />
      <button
        disabled={!write}
        onClick={() => write()}
        className="px-10 py-2 border text-xl"
      >
        Mint SUSD
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
};

export default MintSUSD;
