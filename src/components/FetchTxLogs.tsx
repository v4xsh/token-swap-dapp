import React, { useEffect, useState } from "react";
import Susd from "../../abi/susd.json";
import { publicClient } from "@/pages/_app";
import { env } from "process";
import { useTokenStore } from "../../store/useTokenStore";

const FetchTxLogs = () => {
  const [txns, setTxns] = useState([]);

  const { walletAddress } = useTokenStore();

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
        console.log(logs);
        // const hashes = logs.map((log) => log.address);
        setTxns(logs);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  return <div></div>;
};
export default FetchTxLogs;
