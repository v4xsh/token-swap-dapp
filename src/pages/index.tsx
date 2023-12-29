import dynamic from "next/dynamic";

import Layout from "@/components/Layout";

const SwapAToB = dynamic(() => import("@/components/SwapAToB"), { ssr: false });
const SwapBToA = dynamic(() => import("@/components/SwapBToA"), { ssr: false });

export default function Home() {
  return (
    <Layout>
      <div className="flex h-screen">
        <div className="mx-auto mt-24 mb-auto text-center border border-zinc-600 rounded-2xl py-14 px-36 inline-block">
          <div className="flex flex-col gap-8">
            <SwapAToB />
            <SwapBToA />
          </div>
        </div>
      </div>
    </Layout>
  );
}
