import dynamic from "next/dynamic";

import { useTokenStore } from "../../store/useTokenStore";
import Layout from "@/components/Layout";

const WalletInfo = dynamic(() => import("@/components/WalletInfo"), {
  ssr: false,
});
const Susd = dynamic(() => import("@/components/MintSUSD"), { ssr: false });
const Usdc = dynamic(() => import("@/components/MintUSDC"), { ssr: false });
const SwapAToB = dynamic(() => import("@/components/SwapAToB"), { ssr: false });
const SwapBToA = dynamic(() => import("@/components/SwapBToA"), { ssr: false });

export default function Home() {

  const { address } = useTokenStore();

  return (
    <Layout>
      <div className="m-5 sm:m-10 lg:m-20 xl:m-24 bg-purple-600 p-3 sm:p-5 lg:p-10 xl:p-36">
        {address && (
          <div className="mx-36">
            <WalletInfo address={address} />
            <br />
            <SwapAToB />
            <SwapBToA />
          </div>
        )}
      </div>
    </Layout>
  );
}
