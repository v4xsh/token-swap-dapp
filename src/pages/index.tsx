import { useAccount } from "wagmi";

import Connect from "@/components/Connect";
import Disconnect from "@/components/Disconnect";

import WalletInfo from "@/components/WalletInfo";
import Susd from "@/components/Susd";
import Usdc from "@/components/Usdc";

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <>
      <nav className="flex items-center justify-between mx-20 my-8">
        <div className="text-3xl font-bold uppercase">Token Swap dApp</div>
        {isConnected && <Disconnect />}
      </nav>
      <div className="m-5 sm:m-10 lg:m-20 xl:m-24 bg-purple-600 p-3 sm:p-5 lg:p-10 xl:p-36">
        {!isConnected ? (
          <Connect />
        ) : (
          <>
            <WalletInfo address={address} isConnected={isConnected} />
            <br />
            <div className="flex items-center justify-between">
              <Susd />
              <Usdc />
            </div>
          </>
        )}
      </div>
    </>
  );
}
