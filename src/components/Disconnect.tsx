import React from "react";
import { useDisconnect } from "wagmi";

const Disconnect = () => {
  const { disconnect } = useDisconnect();

  return (
    <button onClick={() => disconnect()} className="px-7 py-3 border text-xl">
      Disconnect
    </button>
  );
};

export default Disconnect;
