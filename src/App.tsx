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
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Create from "./Create";
import Details from "./Details";
import Footer from "./components/Footer";
import KyaModal from "./components/KyaModal";
import ShareModal from "./components/ShareModal";

const AllChains: readonly [Chain, ...Chain[]] = [
  ...(Object.values(chains) as Chain[]),
  citreaTestnet,
] as unknown as readonly [Chain, ...Chain[]];

export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: AllChains,
  ssr: true, // If your d/Bene-FundRaising-EVM-Frontend/App uses server side rendering (SSR)
});

const queryClient = new QueryClient();

function AppContent() {
  const [isKyaModalOpen, setIsKyaModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen KYA modal before
    const kyaSeen = localStorage.getItem("kya_seen_v1");
    if (!kyaSeen) {
      setIsKyaModalOpen(true);
    }
  }, []);

  const handleKyaClick = () => {
    setIsKyaModalOpen(true);
  };

  const handleKyaClose = () => {
    setIsKyaModalOpen(false);
  };

  const handleKyaUnderstand = () => {
    setIsKyaModalOpen(false);
  };

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleShareClose = () => {
    setIsShareModalOpen(false);
  };

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col">
      <Router>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/details/:address" element={<Details />} />
          </Routes>
        </div>
        <Footer onKyaClick={handleKyaClick} onShareClick={handleShareClick} />
        <KyaModal
          isOpen={isKyaModalOpen}
          onClose={handleKyaClose}
          onUnderstand={handleKyaUnderstand}
        />
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={handleShareClose}
        />
      </Router>
    </div>
  );
}

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
          <AppContent />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
