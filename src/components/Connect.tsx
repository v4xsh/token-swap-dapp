import { useConnect } from "wagmi";
import Image from "next/image";

const Connect = () => {
  const { connect, data, connectors, isLoading, pendingConnector } =
    useConnect();

  // console.log(connectors.map(connector => !connector.ready), 8);

  return (
    <>
      {connectors.map((connector) => (
        <button
          className="px-8 py-3 border mx-auto border-zinc-600 rounded-full text-sm flex items-center justify-between"
          // disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name === "MetaMask" && (
            <div className="me-1">
              <Image
                src="/images/metamask_logo.png"
                alt="metamask_logo"
                width={30}
                height={30}
              />
            </div>
          )}
          <span className="ms-3 text-center">{connector.name}</span>

          {isLoading && pendingConnector?.id === connector.id && (
            <>
              <div className="ms-3 me-2">Connecting</div>
              <span className="loader"></span>
            </>
          )}
        </button>
      ))}
    </>
  );
};

export default Connect;
