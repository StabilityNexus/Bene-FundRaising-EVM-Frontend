/**
 * Bene Fundraising DApp - Decentralized Wallet Integration
 * 
 * This implementation removes dependency on WalletConnect/ReOwn SDKs,
 * which posed decentralization risks including:
 * - Centralization through required projectId
 * - Usage limits and potential rate limiting
 * - Potential censorship or service disruption
 * 
 * Instead, we use direct wallet connections:
 * - Injected wallets (MetaMask, Brave, Trust Wallet, etc.)
 * - Coinbase Wallet direct SDK
 * 
 * This enhances the project's "unstoppability" and resilience.
 */

import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { wagmiConfig } from "./config/wagmi";
import Navbar from "./Navbar";
import Home from "./Home";
import Create from "./Create";
import Details from "./Details";

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Improve caching and reduce unnecessary refetches
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});

export default function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <div className="bg-slate-900 min-h-screen">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/details/:address" element={<Details />} />
            </Routes>
          </Router>
          <footer className="text-white text-center py-4 pt-20">
            <div className="container mx-auto">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} Stability Nexus. All rights
                reserved.
              </p>
              <p className="text-xs text-slate-500 mt-2">
                🔒 Decentralized wallet connections - No external service dependencies
              </p>
            </div>
          </footer>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
