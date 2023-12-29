import React, { useEffect, useState } from "react";
import { useContractReads, useContractWrite, usePrepareContractWrite } from "wagmi";

import contract from "../../abi/contract.json";
import Susd from "../../abi/susd.json";
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

  // Approve Token
  const { config: approveConfig, error: approveError } =
    usePrepareContractWrite({
      address: process.env.NEXT_PUBLIC_SUSD_ADDRESS as `0x${string}`,
      abi: Susd,
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
    functionName: "swapAToB",
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

  const { address: walletAddress } = useTokenStore();

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

  const [tokenCurrBalance, setTokenCurrBalance] = useState("");
  useEffect(() => {
    if (readTokenData) {
      setTokenCurrBalance(readTokenData[0]?.result.toString().slice(0, 12));
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
        <div className="text-xl mb-3">SUSD amount</div>
        <div>{tokenCurrBalance}</div>
      </div>
      <div className="flex items-center gap-2">
        <input
          className="px-3 py-2 text-white bg-transparent border border-white rounded-2xl"
          type="number"
          value={tokens}
          onChange={setTokenHandler}
        />
        {!changeApprovalStatus ? (
          <button
            onClick={() => approveToken && approveToken()}
            className={`px-7 py-3 border text-base rounded-full hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all ${
              loadingTokenApproval && "opacity-75 cursor-no-drop"
            }`}
            disabled={loadingTokenApproval}
          >
            {loadingTokenApproval ? "loading.." : "Approve"}
          </button>
        ) : (
          <>
            <button
              onClick={() => swap && swap()}
              className={`px-7 py-3 border text-base rounded-full hover:text-black hover:bg-white transition-all  ${
                loadingSwapping && "opacity-75 cursor-no-drop"
              }`}
              disabled={loadingSwapping}
            >
              {loadingSwapping ? "loading.." : "Swap A to B"}
            </button>
            {/* <div>{swappedOutput}</div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Swap;
