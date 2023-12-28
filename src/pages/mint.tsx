import React from "react";
import MintSUSD from "@/components/MintSUSD";
import MintUSDC from "@/components/MintUSDC";
import Layout from "@/components/Layout";
import { useTokenStore } from "../../store/useTokenStore";

const mint = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between my-10">
        <MintSUSD />
        <MintUSDC />
      </div>
    </Layout>
  );
};

export default mint;
