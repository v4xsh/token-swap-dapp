import React, { useEffect, useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import contract from "../../abi/contract.json";
import Usdc from "../../abi/usdc.json";

const Swap = () => {
  const [tokens, setTokens] = useState(0);
  const setTokenHandler = (e) => {
    if (e.target.value < 0) {
      return;
    }
    setTokens(e.target.value);
  };

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
    <div className="flex items-center gap-4">
      <div>
        <div className="text-xl mb-3">USDC amount</div>
        <input
          className="px-3 py-2 text-white bg-transparent border border-white rounded-2xl"
          type="number"
          value={tokens}
          onChange={setTokenHandler}
        />
      </div>
      <div>
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
              {loadingSwapping ? "loading.." : "Swap B to A"}
            </button>
            {/* <div>{swappedOutput}</div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Swap;
