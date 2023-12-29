import React, { useEffect, useState } from "react";
import {
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import Usdc from "../../abi/susd.json";
import { useTokenStore } from "../../store/useTokenStore";

const MintUSDC = () => {
  const { address: walletAddress } = useTokenStore();

  const [usdcMintAmount, setUsdcMintAmount] = useState(0);
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`,
    abi: Usdc,
    functionName: "mint",
    args: [2000],
  });
  const { data, isLoading, isSuccess, write, error } = useContractWrite(config);

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
      setTokenCurrBalance(String(readTokenData[2].result).slice(0, 9));
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
        onChange={(e) => setUsdcMintAmount(parseFloat(e.target.value))}
        value={usdcMintAmount}
        className="text-black px-5 py-2 text-xl"
      />
      <button
        // disabled={!write}
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

export default MintUSDC;
