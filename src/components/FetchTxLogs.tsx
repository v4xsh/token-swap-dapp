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
        const logs = await publicClient.getContractEvents({
          abi: Susd,
          address: walletAddress,
          // address: process.env.NEXT_PUBLIC_SUSD_ADDRESS as `0x${string}`,
          eventName: "Transfer",
          // args: [
          //   process.env.NEXT_PUBLIC_SUSD_ADDRESS as `0x${string}`,
          //   walletAddress,
          //   // 90000
          //   100
          // ]
        });
        console.log(logs);
        const hashes = logs.map((log) => log.address);
        // setTxns(hashes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  return <div>FetchTxLogs</div>;
};
export default FetchTxLogs;
