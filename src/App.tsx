import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
  Chain,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import * as chains from "wagmi/chains";
import { citreaTestnet } from "./CitreaTestnet";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

// --- Imports ---
import Navbar from "./Navbar";
import Home from "./Home";
import Create from "./Create";
import Details from "./Details";
import Disclaimer from "./Disclaimer"; // <--- NEW IMPORT

const AllChains: readonly [Chain, ...Chain[]] = [
  ...(Object.values(chains) as Chain[]),
  citreaTestnet,
] as unknown as readonly [Chain, ...Chain[]];

export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: AllChains,
  ssr: true, 
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          coolMode
          initialChain={citreaTestnet}
          theme={darkTheme({
            accentColor: "#7b3fe4",
            accentColorForeground: "white",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <div className="bg-slate-900 min-h-screen">
            
            {/* --- DISCLAIMER ADDED HERE --- */}
            <Disclaimer />

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
              </div>
            </footer>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}