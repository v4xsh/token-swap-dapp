// import { useAccount, useConnect } from "wagmi";
// import { MetaMaskConnector } from "wagmi/connectors/metaMask";
// import { create } from "zustand";

// export const useWalletStore = create((set, get) => ({
//   address: "", // wallet address state
//   isConnected: false, // Wallet connection state
//   errorWalletConnection: "",

//   connectWallet: () => {
//     // Connect Wallet Action
//     const connector = new MetaMaskConnector();
//     const { connect, error } = useConnect({ connector });
//     const { address, isConnected } = useAccount();
//     if (!!isConnected) {
//       set({
//         isConnected: isConnected,
//         address: address,
//       });
//     } else if (!isConnected) {
//       set({ errorWalletConnection: error });
//     }
//   },

//   // balance states
//   balanceData: null,
//   balanceError: null,
//   balanceLoading: false,
// }));
