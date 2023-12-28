import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDisconnect } from "wagmi";
import { useTokenStore } from "../../store/useTokenStore";

const Disconnect = () => {
  const router = useRouter();

  const { setAddress } = useTokenStore();

  const { disconnect } = useDisconnect({
    onSuccess() {
      router.push("/login");
      setAddress(null);
    },
  });

  return (
    <button
      onClick={() => disconnect()}
      className="px-7 py-3 border text-base rounded-full hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
    >
      Disconnect
    </button>
  );
};

export default Disconnect;
