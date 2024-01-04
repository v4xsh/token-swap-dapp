import { publicClient } from "@/pages/_app";
import { type Abi } from "viem";

export const batchRequest = async (
  batchSize: number,
  fromBlock: bigint,
  toBlock: bigint,
  limit: bigint,
  contractAddress: `0x${string}`,
  tokenAddress: `0x${string}`,
  walletAddress: `0x${string}`,
  abi: Abi,
) => {
  let initialBlock = [fromBlock, toBlock];
  let batchArray = Array(batchSize - 1)
    .fill(undefined)
    .map((_) => {
      fromBlock += limit;
      toBlock += limit;
      return [fromBlock, toBlock];
    });
  batchArray.unshift(initialBlock);

  const batch = await batchArray.map(([fromBlock, toBlock]) => {
    return publicClient.getContractEvents({
      address: tokenAddress,
      abi: abi,
      eventName: "Transfer",
      args: {
        from: walletAddress,
        to: contractAddress,
      },
      fromBlock: fromBlock,
      toBlock: toBlock,
    });
  });

  let blocks = await Promise.allSettled(batch);

  return blocks
    .map((e) => e.status === "fulfilled" && e.value)
    .flat()
};
