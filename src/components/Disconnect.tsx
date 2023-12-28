import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDisconnect } from "wagmi";
import { useTokenStore } from "../../store/useTokenStore";

const Disconnect = () => {
  const router = useRouter();

  const { setAddress } = useTokenStore();

  const { disconnect } = useDisconnect({
    onSuccess() {
      setAddress(null);
      router.push("/login");
    },
  });

  return (
    <button onClick={() => disconnect()} className="px-7 py-3 border text-base rounded-full hover:text-black hover:bg-white transition-all">
      Disconnect
    </button>
  );
};

export default Disconnect;
