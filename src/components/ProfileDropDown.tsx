import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import { useBalance } from "wagmi";

import { useTokenStore } from "../../store/useTokenStore";
const Disconnect = dynamic(() => import("@/components/Disconnect"));

const Profile = () => {
  const { address } = useTokenStore();

  const { data, isError, isLoading } = useBalance({
    address,
  });

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div className="flex items-center space-x-4 p-4">
      <div
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="bg-white p-2 rounded-full focus:outline-none flex items-center gap-1">
          <Image
            src="/images/metamask_logo.png"
            alt="metamask_logo"
            width={30}
            height={30}
          />
          <div className="text-black">
            {address.slice(0, 6) + "..." + address.slice(-4)}
          </div>
        </button>

        <div
          className={`absolute right-0 ${
            isDropdownVisible ? "" : "hidden"
          } bg-white border text-black shadow-md py-2 mt-1 rounded-md z-10 text-center text-base`}
        >
          <div className="py-1 px-2">{address}</div>
          <div className="flex items-center justify-between py-1 px-2">
            <div className="">
              <span className="font-bold me-1">Token</span>
              {data?.symbol}
            </div>
            <div className="">
              <span className="font-bold me-1">Balance</span>
              {data?.formatted}
            </div>
          </div>
        </div>
      </div>
      <Disconnect />
    </div>
  );
};

export default Profile;
