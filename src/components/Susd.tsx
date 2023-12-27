import React, { useState } from "react";
import { useContractWrite } from "wagmi";
import Susd from "../../abi/susd.json";

const Mint = () => {
  const [susdMintAmount, setSusdMintAmount] = useState(0);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: process.env.NEXT_PUBLIC_TOKEN_A_ADDRESS as `0x${string}`,
    abi: Susd,
    functionName: "mint",
    args: [susdMintAmount],
  });

  return (
    <div className="flex items-center flex-col gap-3">
      <input
        type="number"
        onChange={(e) => setSusdMintAmount(parseFloat(e.target.value))}
        value={susdMintAmount}
        className="text-black px-5 py-2 text-xl"
      />
      <button
        disabled={!write}
        onClick={() => write()}
        className="px-10 py-2 border text-xl"
      >
        Mint SUSD
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
};

export default Mint;
