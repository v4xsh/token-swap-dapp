import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import { tokenStoreType, useTokenStore } from "../../store/useTokenStore";

import Connect from "@/components/Connect";
import { useState } from "react";

const login = () => {
  const router = useRouter();
  const { setAddress } = useTokenStore() as tokenStoreType;

  useAccount({
    onConnect: ({ address }) => {
      if (address) {
        setAddress(address);
        router.push("/");
      }
    },
    onDisconnect: () => {
      setAddress(null);
    },
  });

  return (
    <div className="flex h-screen">
      <div className="m-auto text-center border border-zinc-600 rounded-2xl py-14 px-12 inline-block shadow-inner hover:shadow-inner shadow-blue-400 hover:shadow-blue-600 transition-all">
        <div className="mb-10 text-4xl font-normal">Token Swap DApp</div>
        <div className="text-3xl font-light mb-1">Connect Wallet</div>
        <div className="text-base font-light mb-6">
          Choose a wallet to connect
        </div>
        <Connect />
        <div className="mt-7 text-base font-light">
          Made with <span className="text-blue-600">{"♥"}</span> by Vansh
        </div>
      </div>
    </div>
  );
};

export default login;
