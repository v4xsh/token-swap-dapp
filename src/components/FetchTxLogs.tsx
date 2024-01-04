import React, { useEffect, useState } from "react";
import Susd from "../../abi/susd.json";
import Usdc from "../../abi/usdc.json";
import { publicClient } from "@/pages/_app";
import { useTokenStore } from "../../store/useTokenStore";
import { batchRequest } from "../../utils/batchRequest";
import { type Abi } from "viem";

type TransactionType = {
  transactionHash: string;
  address: string;
  args: {
    from: string;
    to: string;
    value: number;
  };
  operation: string;
};

const contractAddress = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
const susdAddress = process.env.NEXT_PUBLIC_SUSD_ADDRESS as `0x${string}`;
const usdcAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`;

const FetchTxLogs: React.FC = () => {
  const [txns, setTxns] = useState([]);

  const { walletAddress }: { walletAddress: `0x${string}` | null } =
    useTokenStore() as { walletAddress: `0x${string}` | null };

  useEffect(() => {
    const fetchData = async () => {
      let susdTx, usdcTx, txnsArray;
      try {
        let latestBlock = await publicClient.getBlockNumber();
        const blockDifference = 3000n;
        const batchSize = 20;
        let swapContractBlock = 10251787n;
        let swapContractBlockTo = swapContractBlock + blockDifference;

        while (swapContractBlockTo <= latestBlock) {
          susdTx = await batchRequest(
            batchSize,
            swapContractBlock,
            swapContractBlockTo,
            blockDifference,
            contractAddress,
            susdAddress,
            walletAddress as "0x${string}",
            Susd as Abi
          );
          usdcTx = await batchRequest(
            batchSize,
            swapContractBlock,
            swapContractBlockTo,
            blockDifference,
            contractAddress,
            usdcAddress,
            walletAddress as "0x${string}",
            Usdc as Abi
          );
          swapContractBlock += BigInt(batchSize) * blockDifference;
          swapContractBlockTo += BigInt(batchSize) * blockDifference;
        }

        if (susdTx && susdTx.length) {
          susdTx = susdTx.map((tx) => ({ ...tx, operation: "Swap A To B" }));
        }
        if (usdcTx && usdcTx.length) {
          usdcTx = usdcTx.map((tx) => ({ ...tx, operation: "Swap B To A" }));
        }

        if (usdcTx) txnsArray = [...usdcTx];
        if (susdTx) txnsArray = [...susdTx];
      } catch (err) {
        console.error(err);
      }
      setTxns(txnsArray as []);
    };

    fetchData();
  }, [walletAddress]);

  return (
    <div className="mx-12 mt-10">
      <div className="">
        {txns &&
          txns.map((tx: TransactionType) => {
            return (
              <div
                className="border-b-2 border-zinc-500 py-10 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-auto gap-4"
                key={tx?.transactionHash}
              >
                <div className="py-2 px-4 border border-zinc-500 rounded-xl">
                  <span className="me-2 font-bold">Address</span>
                  {tx?.address}
                </div>
                <div className="py-2 px-4 border border-zinc-500 rounded-xl">
                  <span className="me-2 font-bold">Hash</span>
                  {tx?.transactionHash}
                </div>
                <div className="py-2 px-4 border border-zinc-500 rounded-xl">
                  <span className="me-2 font-bold">From</span>
                  {tx?.args?.from}
                </div>
                <div className="py-2 px-4 border border-zinc-500 rounded-xl">
                  <span className="me-2 font-bold">To</span>
                  {tx?.args?.to}
                </div>
                <div className="py-2 px-4 border border-zinc-500 rounded-xl">
                  <span className="me-2 font-bold">Tokens</span>
                  {tx?.args?.value.toString()}
                </div>
                <div className="py-2 px-4 border border-zinc-500 rounded-xl">
                  <span className="me-2 font-bold">Operation</span>
                  {tx?.operation.toString()}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default FetchTxLogs;
