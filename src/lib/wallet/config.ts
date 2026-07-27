import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { supportedChains } from "./chains"



export const wagmiConfig = getDefaultConfig({
  appName: "YourAppName",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: supportedChains as const,
  ssr: true,
})
