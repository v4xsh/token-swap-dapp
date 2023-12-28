import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface tokenStoreType {
  address: `0x${string}` | null;
  setAddress: (address: `0x${string}` | null) => void;
}

export const useTokenStore = create(
  persist(
    (set) => ({
      address: null,

      setAddress: (address: '0x${string}' | null) => {
        set({
          address: address,
        });
      },
    }),
    { name: "walletAddress" }
  )
);
