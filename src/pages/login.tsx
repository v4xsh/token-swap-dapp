import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import { useTokenStore } from "../../store/useTokenStore";

import Connect from "@/components/Connect";
import { useState } from "react";

const login = () => {
  const router = useRouter();
  const { setAddress } = useTokenStore();

  useAccount({
    onConnect: ({ address }) => {
      if (address) {
        setAddress(address);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    },
    onDisconnect: () => {
      setAddress(null);
    },
  });

  return (
    <div className="text-center">
      <div className="mt-32 text-center border border-zinc-600 rounded-2xl py-8 px-10 inline-block shadow-inner hover:shadow-inner shadow-sky-700 hover:shadow-sky-500 transition-all">
        <div className="mb-10 text-3xl font-normal">Token Swap DApp</div>
        <div className="text-2xl font-light mb-1">Connect Wallet</div>
        <div className="text-sm font-light mb-6">
          Choose a wallet to connect
        </div>
        <Connect />
        <div className="mt-7 text-base">
          Made with <span className="text-sky-500">{"♥"}</span> by Vansh
        </div>
      </div>
    </div>
  );
};

export default login;
