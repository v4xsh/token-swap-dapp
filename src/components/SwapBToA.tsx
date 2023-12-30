import React, { useEffect, useState } from "react";
import {
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import contract from "../../abi/contract.json";
import Usdc from "../../abi/usdc.json";
import { useTokenStore } from "../../store/useTokenStore";

const Swap = () => {
  const [tokens, setTokens] = useState(0);
  const setTokenHandler = (e) => {
    if (e.target.value < 0) {
      return;
    }
    setTokens(e.target.value);
  };

  // ----------------------------------------------------------------------

  const { address: walletAddress } = useTokenStore();

  // ----------------------------------------------------------------------

  const {
    data: allowanceData,
    isError: allowanceError,
    isLoading: allowanceLoading,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_SUSD_ADDRESS as `0x${string}`,
    abi: Usdc,
    functionName: "allowance",
    args: [
      walletAddress,
      process.env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`,
    ],
    enabled: !!walletAddress,
    watch: true,
  });

  // ----------------------------------------------------------------------

  // Approve Token
  const { config: approveConfig, error: approveError } =
    usePrepareContractWrite({
      address: process.env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`,
      abi: Usdc,
      functionName: "approve",
      args: [process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, tokens],
      enabled: true,
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
    functionName: "swapBToA",
    args: [tokens],
    enabled: tokenApprovalSuccess,
  });

  const {
    data: swappedOutput,
    isLoading: loadingSwapping,
    isSuccess: swapSuccess,
    write: swap,
  } = useContractWrite(swapConfig);

  // ----------------------------------------------------------------------

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
        functionName: "balanceOf",
        args: [walletAddress as `0x${string}`],
      },
    ],
    watch: true,
  });

  const [tokenCurrBalance, setTokenCurrBalance] = useState("");
  useEffect(() => {
    if (readTokenData) {
      setTokenCurrBalance(readTokenData[0]?.result?.toString().slice(0, 12));
    }
  }, [readTokenData]);

  // ----------------------------------------------------------------------

  const [changeApprovalStatus, setChangeApprovalStatus] = useState(false);
  useEffect(() => {
    if (swapSuccess) {
      setChangeApprovalStatus(false);
    }
  }, [swapSuccess]);
  useEffect(() => {
    if (tokenApprovalSuccess) {
      setChangeApprovalStatus(true);
    }
  }, [tokenApprovalSuccess]);

  return (
    <div className="flex items-center gap-0 flex-col">
      <div>
        <div className="text-xl mb-3">USDC amount</div>
        <div>{tokenCurrBalance}</div>
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
              ? approveToken && approveToken()
              : swap && swap()
          }
          className={`px-7 py-3 border text-base rounded-full hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all ${
            loadingTokenApproval && "opacity-75 cursor-no-drop"
          }`}
          disabled={loadingTokenApproval}
        >
          {(allowanceData as bigint) > 0n ? "Swap B To A" : "Approve"}
        </button>
      </div>
    </div>
  );
};

export default Swap;
