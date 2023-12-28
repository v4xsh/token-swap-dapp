import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import { useTokenStore } from "../../store/useTokenStore";

import Connect from "@/components/Connect";

const login = () => {
  const router = useRouter();
  const { setAddress, address } = useTokenStore();

  useAccount({
    onConnect: ({ address }) => {
      if (address) {
        setAddress(address);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    },
    onDisconnect: () => {
      setAddress(null);
    },
  });

  return (
    <div className="mt-32">
      <Connect />
    </div>
  );
};

export default login;
