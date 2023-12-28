import { useRouter } from "next/navigation";
import React from "react";
import { useDisconnect } from "wagmi";

const Disconnect = () => {
  const router = useRouter();

  const { disconnect } = useDisconnect({
    onSuccess() {
      router.push("/login");
    },
  });

  return (
    <button onClick={() => disconnect()} className="px-7 py-3 border text-xl">
      Disconnect
    </button>
  );
};

export default Disconnect;
