import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDisconnect } from "wagmi";
import { tokenStoreType, useTokenStore } from "../../store/useTokenStore";

const Disconnect = () => {
  const router = useRouter();

  const { setAddress, address } = useTokenStore() as tokenStoreType;

  const { disconnect } = useDisconnect({
    onSuccess() {
      if (address) {
        setAddress(null);
        router.push("/login");
      }
    },
  });

  return (
    <button
      id="disconnect-btn"
      onClick={() => disconnect()}
      className="px-7 py-3 border text-base rounded-full hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
    >
      Disconnect
    </button>
  );
};

export default Disconnect;
