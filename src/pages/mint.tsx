import dynamic from "next/dynamic";
import Layout from "@/components/Layout";

const MintSUSD = dynamic(() => import("@/components/MintSUSD"), { ssr: false });
const MintUSDC = dynamic(() => import("@/components/MintUSDC"), { ssr: false });

const mint = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between flex-col gap-10 my-10">
        <MintSUSD />
        <MintUSDC />
      </div>
    </Layout>
  );
};

export default mint;
