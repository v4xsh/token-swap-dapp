import React, { useEffect, useState } from "react";
import {
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import contract from "../../abi/contract.json";
import Susd from "../../abi/susd.json";
import { useTokenStore } from "../../store/useTokenStore";

const Swap = () => {
  const [tokens, setTokens] = useState<number>(0);
  const setTokenHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 0) {
      return;
    }
    setTokens(value);
  };

  // ----------------------------------------------------------------------

  const { address: walletAddress } = useTokenStore() as {
    address: `0x${string}` | null;
  };

  // ----------------------------------------------------------------------

  // Read Allowance Balance
  const { data: allowanceData } = useContractRead({
    address: process.env.NEXT_PUBLIC_SUSD_ADDRESS as `0x${string}`,
    abi: Susd,
    functionName: "allowance",
    args: [
      walletAddress,
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    ],
    enabled: !!walletAddress,
    watch: true,
  });

  // ----------------------------------------------------------------------

  // Approve Token
  const { config: approveConfig, error: approveError } =
    usePrepareContractWrite({
      address: process.env.NEXT_PUBLIC_SUSD_ADDRESS as `0x${string}`,
      abi: Susd,
      functionName: "approve",
      args: [process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, tokens],
      enabled: (allowanceData as bigint) === 0n,
    });

  const {
    data: approvedTokenData,
    isLoading: loadingTokenApproval,
    isSuccess: tokenApprovalSuccess,
    write: approveToken,
  } = useContractWrite(approveConfig);

  // ----------------------------------------------------------------------

  // Swap Token
  const { config: swapConfig, error: swapError } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contract,
    functionName: "swapAToB",
    args: [tokens],
    enabled:
      (allowanceData as bigint) >= 0n && tokens <= (allowanceData as bigint),
  });

  const {
    data: swappedTokenData,
    isLoading: loadingSwapping,
    isSuccess: swapSuccess,
    write: swap,
  } = useContractWrite(swapConfig);

  // ----------------------------------------------------------------------

  const [hash, setHash] = useState<`0${string}` | undefined>();
  const {
    data: txData,
    isError: errorTx,
    isLoading: loadingTx,
  } = useWaitForTransaction({
    hash,
    enabled: !!hash,
  });

  useEffect(() => {
    if (tokenApprovalSuccess) setHash(approvedTokenData?.hash as `0${string}`);
    if (swapSuccess) setHash(swappedTokenData?.hash as `0${string}`);
  }, [loadingTokenApproval, tokenApprovalSuccess, loadingSwapping]);

  // ----------------------------------------------------------------------

  // Read Token Balance
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
        functionName: "balanceOf",
        args: [walletAddress as `0x${string}`],
      },
    ],
    watch: true,
  });

  const [tokenCurrBalance, setTokenCurrBalance] = useState<string | undefined>(
    ""
  );
  useEffect(() => {
    if (readTokenData) {
      setTokenCurrBalance(readTokenData[0]?.result?.toString().slice(0, 12));
    }
  }, [readTokenData]);

  // ----------------------------------------------------------------------

  return (
    <div className="flex items-center gap-0 flex-col">
      <div>
        <div className="text-xl mb-3">SUSD amount</div>
        <div>{tokenCurrBalance}</div>
        <div>
          <span>Allowance:</span> {allowanceData?.toString()}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          className="px-3 py-2 text-white bg-transparent border border-white rounded-2xl"
          type="number"
          value={tokens}
          onChange={setTokenHandler}
        />
        <button
          onClick={() =>
            (allowanceData as bigint) > 0n
              ? swap && swap()
              : approveToken && approveToken()
          }
          className={`px-7 py-3 border text-base rounded-full hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all ${
            loadingTokenApproval ||
            loadingSwapping ||
            (loadingTx && "opacity-75 cursor-no-drop")
          }`}
          disabled={loadingTokenApproval || loadingSwapping || loadingTx}
        >
          {(allowanceData as bigint) > 0n ? "Swap A To B" : "Approve"}
        </button>
        {loadingTx && (
          <>
            <span className="absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 loader z-50"></span>
            <div className="backdrop h-screen w-screen z-10 bg-black opacity-60 absolute top-0 left-0"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Swap;
