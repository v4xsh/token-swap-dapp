import React, { useEffect, ReactNode } from "react";
import { useEnsAvatar, useEnsName } from "wagmi";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useTokenStore } from "../../store/useTokenStore";

const ProfileDropDown = dynamic(() => import("@/components/ProfileDropDown"), { ssr: false });

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const { address }: { address: `0x${string}` | null } = useTokenStore();
  useEffect(() => {
    if (!address) {
      router.push("/login");
    }
  }, [address]);

  // Todo: Try and add useEnsName
  // const { data: ensNameData } = useEnsName({ address: address });
  // const { data: ensAvatarData } = useEnsAvatar({ name: ensNameData });

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between py3 mx-20 mb-8 mt-3">
        <div className="flex items-center gap-10">
          <div className="text-3xl font-light">TS DApp</div>
          <Link className="text-lg" href="/">
            Home
          </Link>
          <Link className="text-lg" href="/mint">
            Mint
          </Link>
          <Link className="text-lg" href="/txhistory">
            Tx History
          </Link>
        </div>
        <div className="ml-auto">{address && <ProfileDropDown />}</div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
