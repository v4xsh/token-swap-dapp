import Image from "next/image";
import React, { useState } from "react";
import { useConnect } from "wagmi";
// import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const Connect = () => {
  const [isConnecting, setIsConnecting] = useState(false);

  const { connect, data, connectors, isLoading, pendingConnector } = useConnect(
    {
      // connector: new MetaMaskConnector(),
      onSuccess: () => {
        setIsConnecting(true);
      },
      onMutate: () => {
        setIsConnecting(true);
      },
      // onSettled: () => {
      //   setIsConnecting(false);
      // },
    }
  );

  console.log(data, connectors, 22);

  return (
    // <button
    //   className="px-8 py-3 border mx-auto border-zinc-600 rounded-full text-sm flex items-center justify-between"
    //   onClick={() => connect()}
    //   // disabled={data.status === "connected" || isConnecting}
    // >
    //   <div className="me-3">
    //     <Image
    //       src="/images/metamask_logo.png"
    //       alt="metamask_logo"
    //       width={30}
    //       height={30}
    //     />
    //   </div>
    //   {isConnecting ? (
    //     <>
    //       <div className="ms=3 me-2">Connecting</div>
    //       <span className="loader"></span>
    //     </>
    //   ) : (
    //     <span className="ms-3 text-center">Connect Metamask</span>
    //   )}
    // </button>
    <>
      {connectors.map((connector) => (
        <button
          // disabled={connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {isLoading &&
            pendingConnector?.id === connector.id &&
            " (connecting)"}
        </button>
      ))}
    </>
  );
};

export default Connect;
