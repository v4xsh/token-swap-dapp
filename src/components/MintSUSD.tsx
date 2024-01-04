import React, { useEffect, useState } from "react";
import {
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import Susd from "../../abi/susd.json";
import { tokenStoreType, useTokenStore } from "../../store/useTokenStore";
import Image from "next/image";

const MintSUSD = () => {
  const { address: walletAddress } = useTokenStore() as tokenStoreType;

  const [susdMintAmount, setSusdMintAmount] = useState(0);
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_SUSD_ADDRESS as `0x${string}`,
    abi: Susd,
    functionName: "mint",
    args: [susdMintAmount],
  });
  const { data, isLoading, isSuccess, write, error } = useContractWrite(config);

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
      setTokenSymbol(String(readTokenData[0].result));
      setTokenName(String(readTokenData[1].result));
      setTokenCurrBalance(String(readTokenData[2].result).slice(0, 12));
    }
  }, [readTokenData]);

  const [mintAmountError, setMintAmountError] = useState(false);
  useEffect(() => {
    if (susdMintAmount < 0) setMintAmountError(true);
    else setMintAmountError(false);
  }, [susdMintAmount]);

  const writeHandler = () => {
    if (susdMintAmount < 0) {
      setMintAmountError(true);
      return;
    }
    setMintAmountError(false);
    write && write();
  };

  return (
    <div className="flex items-center flex-col gap-3">
      <div>
        {tokenName}
        {" - "}
        {tokenSymbol}
      </div>
      <div>
        <span className="me-1 font-bold">Balance:</span>
        {tokenCurrBalance}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          onChange={(e) => setSusdMintAmount(parseFloat(e.target.value))}
          value={susdMintAmount}
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
            "Mint SUSD"
          )}{" "}
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

export default MintSUSD;
