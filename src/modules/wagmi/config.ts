import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const reownProjectId = process.env.NEXT_PUBLIC_REOWN_PROJECT;

import { defineChain } from 'viem'
 
export const soneium = defineChain({
  id: 1868,
  name: 'Soneium',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.soneium.org'],
      webSocket: ['wss://soneium.drpc.org'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://soneium.blockscout.com/' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 1,
    },
  },
  iconUrl: "/symbol-full-color.svg",
})

export const WAGMI_CONFIG = getDefaultConfig({
  appName: "Yooni",
  projectId: reownProjectId as string,
  chains: [soneium],
  ssr: true,
});
