import React, { useEffect, useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import contract from "../../abi/contract.json";
import Susd from "../../abi/susd.json";

const Swap = () => {
  // Approve Token
  const { config: approveConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_SUSD_ADDRESS as `0x${string}`,
    abi: Susd,
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
    functionName: "swapAToB",
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
  const [changeApprovalStatus, setChangeApprovalStatus] = useState(false);

  useEffect(() => {
    if (swapSuccess) {
      setChangeApprovalStatus(swapSuccess);
    } else if (tokenApprovalSuccess) {
      setChangeApprovalStatus(tokenApprovalSuccess);
    }
  }, [tokenApprovalSuccess, swapSuccess])

  return (
    <div>
      <div>
        SUSD amount
        <input
          type="number"
          value={tokens}
          onChange={(e) => setTokens(e.target.value)}
        />
      </div>
      {!changeApprovalStatus ? (
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
            Swap A to B
          </button>
          {/* <div>{swappedOutput}</div> */}
        </>
      )}
    </div>
  );
};

export default Swap;
