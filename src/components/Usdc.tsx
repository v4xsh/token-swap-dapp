import React, { useEffect, useState } from "react";
import { useContractReads, useContractWrite } from "wagmi";
import Usdc from "../../abi/susd.json";

const Mint = () => {
  const [usdcMintAmount, setUsdcMintAmount] = useState(0);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: process.env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`,
    abi: Usdc,
    functionName: "mint",
    args: [usdcMintAmount],
  });

  const usdcTokenContract = {
    address: process.env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`,
    abi: Usdc,
  };

  const {
    data: readTokenData,
    isError,
    isLoading: isLoadingTokenData,
  } = useContractReads({
    contracts: [
      {
        ...usdcTokenContract,
        functionName: "name",
      },
      {
        ...usdcTokenContract,
        functionName: "symbol",
      },
      {
        ...usdcTokenContract,
        functionName: "balanceOf",
        args: [process.env.NEXT_PUBLIC_PERSONAL_WALLET as `0x${string}`],
      },
    ],
  });

  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenCurrBalance, setTokenCurrBalance] = useState("");

  useEffect(() => {
    setTokenSymbol(readTokenData[0].result);
    setTokenName(readTokenData[1].result);
    setTokenCurrBalance(readTokenData[2].result.toString());
  });

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
        onChange={(e) => setUsdcMintAmount(parseFloat(e.target.value))}
        value={usdcMintAmount}
        className="text-black px-5 py-2 text-xl"
      />
      <button
        disabled={!write}
        onClick={() => write()}
        className="px-10 py-2 border text-xl"
      >
        Mint USDC
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
};

export default Mint;
