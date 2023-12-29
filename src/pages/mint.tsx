import dynamic from "next/dynamic";
import Layout from "@/components/Layout";

const MintSUSD = dynamic(() => import("@/components/MintSUSD"), { ssr: false });
const MintUSDC = dynamic(() => import("@/components/MintUSDC"), { ssr: false });

const mint = () => {
  return (
    <Layout>
      <div className="flex justify-center">
        <div className="inline-block my-10 border border-zinc-500 rounded-2xl px-10 py-12">
          <MintSUSD />
          <br />
          <MintUSDC />
        </div>
      </div>
    </Layout>
  );
};

export default mint;
