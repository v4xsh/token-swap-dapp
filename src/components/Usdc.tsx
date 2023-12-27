import React, { useState } from "react";
import { useContractWrite } from "wagmi";
import Usdc from "../../abi/susd.json";

const Mint = () => {
  const [usdcMintAmount, setUsdcMintAmount] = useState(0);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: process.env.NEXT_PUBLIC_TOKEN_A_ADDRESS as `0x${string}`,
    abi: Usdc,
    functionName: "mint",
    args: [usdcMintAmount],
  });

  

  return (
    <div className="flex items-center flex-col gap-3">
      <input
        type="number"
        onChange={(e) => setUsdcMintAmount(parseFloat(e.target.value))}
        value={usdcMintAmount}
        className="text-black px-5 py-2 text-xl"
      />
      <button
        disabled={!write}
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

export default Mint;
