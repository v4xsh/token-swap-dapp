import { create } from "zustand";

interface tokenStoreType {
  address: `0x${string}` | null;
  setAddress: (address: `0x${string}` | null) => void;
}

export const useTokenStore = create<tokenStoreType>((set) => ({
  address: null, // wallet address state

  setAddress: (address) => {
    set({
      address: address,
    });
  },

  // balance states
  // balanceData: null,
  // balanceError: null,
  // balanceLoading: false,
}));
