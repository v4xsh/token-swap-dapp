import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useTokenStore } from "../../store/useTokenStore";

import Disconnect from "@/components/Disconnect";

const Layout = ({ children }) => {
  const router = useRouter();

  const { address } = useTokenStore();
  useEffect(() => {
    if (!address) {
      router.push("/login");
    }
  }, [address]);

  return (
    <div>
      <nav className="flex items-center justify-between mx-20 my-8">
        <div className="flex items-center gap-10">
          <div className="text-3xl font-bold uppercase">Token Swap dApp</div>
          <Link className="text-lg" href="/">Home</Link>
          <Link className="text-lg" href="/mint">Mint</Link>
        </div>
        <div>{address && <Disconnect />}</div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
