import React, { useEffect, useState } from "react";
import Susd from "../../abi/susd.json";
import { publicClient } from "@/pages/_app";
import { env } from "process";
import { useTokenStore } from "../../store/useTokenStore";

type TransactionType = {
  transactionHash: string;
  address: string;
  args: {
    from: string;
    to: string;
    value: number;
  };
}

const FetchTxLogs: React.FC = () => {
  const [txns, setTxns] = useState([]);

  const { walletAddress }: { walletAddress: `0x${string}` | null } =
    useTokenStore() as { walletAddress: `0x${string}` | null };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let latestBlock = await publicClient.getBlockNumber();
        let fromBlock = latestBlock - 3000n;
        const logs = await publicClient.getContractEvents({
          address: process.env.NEXT_PUBLIC_SUSD_ADDRESS as `0x${string}`,
          abi: Susd,
          eventName: "Transfer",
          args: {
            from: walletAddress,
            to: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
          },
          fromBlock: fromBlock,
          toBlock: latestBlock,
        });
        setTxns(logs as []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-32 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-auto gap-4">
        <div className="py-2 px-4 border border-zinc-300">Address</div>
        <div className="py-2 px-4 border border-zinc-300">From</div>
        <div className="py-2 px-4 border border-zinc-300">To</div>
        <div className="py-2 px-4 border border-zinc-300">Tokens</div>

        {txns.map((tx: TransactionType) => {
          return (
            <React.Fragment key={tx?.transactionHash}>
              <div className="py-2 md:border-t md:border-zinc-300">
                {tx?.address}
              </div>
              <div className="py-2 md:border-t md:border-zinc-300">
                {tx?.args?.from}
              </div>
              <div className="py-2 md:border-t md:border-zinc-300">
                {tx?.args?.to}
              </div>
              <div className="py-2 md:border-t md:border-zinc-300">
                {tx?.args?.value.toString()}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
export default FetchTxLogs;
