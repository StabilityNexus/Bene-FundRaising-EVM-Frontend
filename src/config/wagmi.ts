import { createConfig, http } from "wagmi";
import * as chains from "wagmi/chains";
import { citreaTestnet } from "../CitreaTestnet";
import { injected, coinbaseWallet } from "wagmi/connectors";

/**
 * Decentralized Wallet Configuration
 * 
 * This configuration removes dependency on WalletConnect/ReOwn SDKs
 * which require a centralized projectId and could be subject to:
 * - Usage limits
 * - Potential censorship
 * - Single point of failure
 * 
 * Instead, we use direct wallet connectors:
 * - Injected (MetaMask, Brave, any browser extension wallet)
 * - Coinbase Wallet (direct SDK integration)
 * 
 * This approach enhances the project's "unstoppability" and resilience.
 */

// Collect all wagmi chains plus our custom Citrea testnet
const allChains = [
  citreaTestnet,
  chains.mainnet,
  chains.sepolia,
  chains.polygon,
  chains.polygonMumbai,
  chains.arbitrum,
  chains.arbitrumSepolia,
  chains.optimism,
  chains.optimismSepolia,
  chains.base,
  chains.baseSepolia,
  chains.bsc,
  chains.bscTestnet,
  chains.avalanche,
  chains.avalancheFuji,
  chains.fantom,
  chains.fantomTestnet,
  chains.gnosis,
  chains.zkSync,
  chains.linea,
  chains.scroll,
] as const;

// Create transport configuration for each chain
const transports = Object.fromEntries(
  allChains.map((chain) => [chain.id, http()])
) as Record<(typeof allChains)[number]["id"], ReturnType<typeof http>>;

/**
 * Wagmi configuration with decentralized wallet connectors
 * 
 * Connectors used:
 * 1. injected() - Supports any injected wallet (MetaMask, Brave, Trust Wallet, etc.)
 * 2. coinbaseWallet() - Direct integration without WalletConnect
 * 
 * Benefits:
 * - No external service dependencies
 * - No API keys or project IDs required
 * - Works offline once wallet is connected
 * - Cannot be rate-limited or censored
 */
export const wagmiConfig = createConfig({
  chains: allChains,
  connectors: [
    // Injected connector - supports all browser extension wallets
    injected({
      shimDisconnect: true,
    }),
    // Coinbase Wallet - direct SDK integration
    coinbaseWallet({
      appName: "Bene Fundraising",
      appLogoUrl: "/Benelogo.svg",
    }),
  ],
  transports,
  // Enable multi-injection detection for wallets like MetaMask, Brave, etc.
  multiInjectedProviderDiscovery: true,
});

// Export chain list for use in other components
export { allChains };

// Type exports for better TypeScript support
export type SupportedChainId = (typeof allChains)[number]["id"];
