import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { soneiumMinato } from "viem/chains";

const reownProjectId = process.env.NEXT_PUBLIC_REOWN_PROJECT;

const minato = {
  ...soneiumMinato,
  name: "Soneium Minato",
  iconUrl: "/symbol-full-color.svg",
};

export const WAGMI_CONFIG = getDefaultConfig({
  appName: "Yooni",
  projectId: reownProjectId as string,
  chains: [minato],
  ssr: true,
});
