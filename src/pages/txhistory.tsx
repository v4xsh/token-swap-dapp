import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { useTransaction } from "wagmi";

let timer: number;

const txhistory = () => {
  const [hash, setHash] = useState<`0x${string}`>();

  const { data, isError, isLoading } = useTransaction({
    hash,
  });

  const [transactionState, setTransactionState] = useState({
    blockHash: "",
    blockNumber: "",
    chainId: "",
    from: "",
    gas: "",
    gasPrice: "",
    to: "",
  });

  useEffect(() => {
    if (data) {
      setTransactionState((prevState) => ({
        ...prevState,
        blockHash: data?.blockHash?.toString()!,
        blockNumber: data?.blockNumber?.toString()!,
        chainId: data?.chainId?.toString()!,
        from: data?.from?.toString()!,
        gas: data?.gas?.toString()!,
        gasPrice: data?.gasPrice?.toString()!,
        to: data?.to?.toString()!,
      }));
      console.log(data);
    }
  }, [data]);

  const setHashHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setHash(e.target.value.toString() as `0x${string}`);
    }, 3000);
  };

  return (
    <Layout>
      <div className="flex items-center justify-start flex-col gap-4 mt-36">
        <div className="flex items-center w-6/12">
          <input
            className="text-black px-5 py-2 text-base w-full"
            placeholder="Enter Tx Hash"
            type="text"
            value={hash}
            onChange={(e) => setHash(e.target.value.toString() as `0x${string}`)}
          />
        </div>
        <div>
          {isLoading ? (
            "Fetching details"
          ) : (
            <div className={`${isLoading ? "hidden" : "block"}`}>
              <p>Block Hash: {transactionState.blockHash}</p>
              <p>Block Number: {transactionState.blockNumber}</p>
              <p>Chain ID: {transactionState.chainId}</p>
              <p>From: {transactionState.from}</p>
              <p>Gas: {transactionState.gas}</p>
              <p>Gas Price: {transactionState.gasPrice}</p>
              <p>To: {transactionState.to}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default txhistory;
