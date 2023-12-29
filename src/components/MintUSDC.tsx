import React, { useEffect, useState } from "react";
import {
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import Usdc from "../../abi/susd.json";
import { useTokenStore } from "../../store/useTokenStore";
import Image from "next/image";

const MintUSDC = () => {
  const { address: walletAddress } = useTokenStore();

  const [usdcMintAmount, setUsdcMintAmount] = useState(0);
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`,
    abi: Usdc,
    functionName: "mint",
    args: [usdcMintAmount],
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
      setTokenCurrBalance(String(readTokenData[2].result).slice(0, 10));
    }
  }, [readTokenData]);

  const [mintAmountError, setMintAmountError] = useState(false);
  useEffect(() => {
    if (usdcMintAmount < 0) setMintAmountError(true);
    else setMintAmountError(false);
  }, [usdcMintAmount]);

  const writeHandler = () => {
    if (usdcMintAmount < 0) {
      setMintAmountError(true);
      return;
    }
    setMintAmountError(false);
    write();
  };

  return (
    <div className="flex items-center flex-col gap-3">
      <div>
        {tokenName}
        {" - "}
        {tokenSymbol}
      </div>
      <div><span className="me-1 font-bold">Balance:</span>{tokenCurrBalance}</div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          onChange={(e) => setUsdcMintAmount(parseFloat(e.target.value))}
          value={usdcMintAmount}
          className="text-black px-5 py-2 text-xl"
        />
        <button
          disabled={isLoading || mintAmountError}
          onClick={writeHandler}
          className={`px-7 py-3 border text-base rounded-full hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all ${
            isLoading &&
            "cursor-not-allowed opacity-75 bg-blue-600 hover:bg-blue-600 hover:border-blue-600"
          }`}
        >
          {isLoading ? (
            <div className="ms-3 me-2">Check Wallet</div>
          ) : (
            "Mint USDC"
          )}
        </button>
      </div>

      {mintAmountError && (
        <div className="flex items-center gap-1">
          <Image
            src="/images/warning.png"
            alt="warning"
            height={20}
            width={20}
          />
          <div className="text-red-500">
            Mint amount cannot be less than zero
          </div>
        </div>
      )}

      {isSuccess && <div>Transaction Hash: {JSON.stringify(data?.hash!)}</div>}
    </div>
  );
};

export default MintUSDC;
