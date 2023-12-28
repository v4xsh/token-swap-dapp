import React, { useEffect, useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import contract from "../../abi/contract.json";
import Usdc from "../../abi/usdc.json";

const Swap = () => {
  // Approve Token
  const { config: approveConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`,
    abi: Usdc,
    functionName: "approve",
    args: [process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, 20000],
    enabled: true,
  });

  const {
    data: approvedTokenData,
    isLoading: loadingTokenApproval,
    isSuccess: tokenApprovalSuccess,
    write: approveToken,
  } = useContractWrite(approveConfig);

  // Swap Token
  const { config: swapConfig, error } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contract,
    functionName: "swapBToA",
    args: [20000],
    enabled: tokenApprovalSuccess,
  });

  const {
    data: swappedOutput,
    isLoading: loadingSwappingOp,
    isSuccess: swapSuccess,
    write: swap,
  } = useContractWrite(swapConfig);

  const [tokens, setTokens] = useState(0);

  return (
    <div>
      <div>
        USDC amount
        <input
          type="number"
          value={tokens}
          onChange={(e) => setTokens(e.target.value)}
        />
      </div>
      {!tokenApprovalSuccess ? (
        <button
          onClick={() => approveToken && approveToken()}
          className="px-10 py-2 border text-xl bg-white border-purple-800 text-purple-600"
          disabled={loadingTokenApproval}
        >
          Approve
        </button>
      ) : (
        <>
          <button
            onClick={() => swap && swap()}
            className="px-10 py-2 border text-xl bg-white border-purple-800 text-purple-600"
            // disabled={loadingTokenApproval}
          >
            Swap B To A
          </button>
          {/* <div>{swappedOutput}</div> */}
        </>
      )}
    </div>
  );
};

export default Swap;