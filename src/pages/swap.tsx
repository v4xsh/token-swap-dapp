import dynamic from "next/dynamic";
import Layout from "@/components/Layout";

const SwapAToB = dynamic(() => import("@/components/SwapAToB"), { ssr: false });
const SwapBToA = dynamic(() => import("@/components/SwapBToA"), { ssr: false });

const swap = () => {
  return (
    <Layout>
      <SwapAToB />
      <SwapBToA />
    </Layout>
  );
};

export default swap;
