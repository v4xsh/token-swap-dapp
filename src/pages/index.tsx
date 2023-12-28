import dynamic from "next/dynamic";

import { useTokenStore } from "../../store/useTokenStore";
import Layout from "@/components/Layout";
import { useEffect } from "react";

const WalletInfo = dynamic(() => import("@/components/WalletInfo"), {
  ssr: false,
});
export default function Home() {
  return (
    <Layout>
      <div className="m-5 sm:m-10 lg:m-20 xl:m-24 bg-purple-600 p-3 sm:p-5 lg:p-10 xl:p-36">
        <div className="mx-36">
          <WalletInfo />
        </div>
      </div>
    </Layout>
  );
}
