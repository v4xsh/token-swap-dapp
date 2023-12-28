import Image from "next/image";
import React, { useState } from "react";
import { useConnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const Connect = () => {
  const [isConnecting, setIsConnecting] = useState(false);

  const connector = new MetaMaskConnector();
  const { connect } = useConnect({
    connector: connector,
    onSuccess: () => {
      setIsConnecting(true);
    },
  });

  return (
    <button
      className="px-8 py-3 border mx-auto border-zinc-600 rounded-full text-sm flex items-center justify-between"
      onClick={() => connect()}
    >
      <div className="me-3">
        <Image
          src="/images/metamask_logo.png"
          alt="metamask_logo"
          width={30}
          height={30}
        />
      </div>
        {isConnecting ? (
          <>
            <div className="ms=3 me-2">Connecting</div>
            <span className="loader"></span>
          </>
        ) : (
          <span className="ms-3 text-center">Connect Metamask</span>
        )}
    </button>
  );
};

export default Connect;
