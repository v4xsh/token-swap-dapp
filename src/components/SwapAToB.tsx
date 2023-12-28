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
  }, [tokenApprovalSuccess, swapSuccess]);

  return (
    <div className="flex items-center gap-2">
      <div className="text-xl">SUSD amount</div>
      <input
        className="px-3 py-2 text-black"
        type="number"
        value={tokens}
        onChange={(e) => setTokens(e.target.value)}
      />
      {!changeApprovalStatus ? (
        <button
          onClick={() => approveToken && approveToken()}
          className="px-7 py-3 border text-base rounded-full hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all"
          disabled={loadingTokenApproval}
        >
          Approve
        </button>
      ) : (
        <>
          <button
            onClick={() => swap && swap()}
            className="px-7 py-3 border text-base rounded-full hover:text-black hover:bg-white transition-all"
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
