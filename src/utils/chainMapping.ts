/**
 * Maps chain IDs to their corresponding token list names
 * Used to fetch tokens from the Stability Nexus TokenList repository
 */
export const getChainNameForTokenList = (chainId: number): string | null => {
  // Map of chain IDs to token list names
  const chainMapping: Record<number, string> = {
    // Ethereum Mainnet
    1: "ethereum",
    // Ethereum Sepolia
    11155111: "ethereum",
    // Ethereum Classic
    61: "ethereum-classic",
    // Polygon PoS
    137: "polygon-pos",
    // Polygon Mumbai
    80001: "polygon-pos",
    // Binance Smart Chain
    56: "binance-smart-chain",
    // BSC Testnet
    97: "binance-smart-chain",
    // Base
    8453: "base",
    // Base Sepolia
    84532: "base",
    // Citrea Testnet (may not have a token list, but we'll try)
    5115: "ethereum", // Fallback to ethereum for now
  };

  return chainMapping[chainId] || null;
};

