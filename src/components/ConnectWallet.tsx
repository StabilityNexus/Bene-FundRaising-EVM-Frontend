import { useState, useCallback, useEffect, useRef } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
  useSwitchChain,
  useChainId,
} from "wagmi";
import { citreaTestnet } from "../CitreaTestnet";
import { allChains } from "../config/wagmi";

/**
 * Decentralized Wallet Connection Component
 * 
 * This component provides wallet connection without relying on WalletConnect/ReOwn.
 * It supports:
 * - Direct injected wallet connections (MetaMask, Brave, etc.)
 * - Coinbase Wallet direct SDK
 * - Chain switching
 * - Network management
 * 
 * No centralized services, no API keys, no censorship risk.
 */

// Wallet icons mapping
const WALLET_ICONS: Record<string, string> = {
  "MetaMask": "🦊",
  "Coinbase Wallet": "🔵",
  "Injected": "💉",
  "Browser Wallet": "🌐",
};

const getWalletIcon = (name: string): string => {
  return WALLET_ICONS[name] || "👛";
};

// Format address for display
const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Format balance for display
const formatBalance = (balance: string, decimals: number = 4): string => {
  const num = parseFloat(balance);
  if (num === 0) return "0";
  if (num < 0.0001) return "<0.0001";
  return num.toFixed(decimals);
};

interface ConnectWalletProps {
  accountStatus?: {
    smallScreen: "avatar" | "full";
    largeScreen: "avatar" | "full";
  };
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({
  accountStatus = { smallScreen: "avatar", largeScreen: "full" },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChainMenuOpen, setIsChainMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const chainMenuRef = useRef<HTMLDivElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  const { address, isConnected, connector } = useAccount();
  const chainId = useChainId();
  const { connectors, connect, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const { data: balance } = useBalance({
    address: address,
  });

  // Get current chain info
  const currentChain = allChains.find((c) => c.id === chainId) || citreaTestnet;

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
      if (chainMenuRef.current && !chainMenuRef.current.contains(event.target as Node)) {
        setIsChainMenuOpen(false);
      }
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
        setIsChainMenuOpen(false);
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleConnect = useCallback(
    (connectorId: string) => {
      const selectedConnector = connectors.find((c) => c.id === connectorId);
      if (selectedConnector) {
        connect({ connector: selectedConnector });
        setIsModalOpen(false);
      }
    },
    [connectors, connect]
  );

  const handleDisconnect = useCallback(() => {
    disconnect();
    setIsAccountMenuOpen(false);
  }, [disconnect]);

  const handleSwitchChain = useCallback(
    (newChainId: number) => {
      switchChain({ chainId: newChainId });
      setIsChainMenuOpen(false);
    },
    [switchChain]
  );

  const copyAddress = useCallback(() => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  }, [address]);

  // Not connected - show connect button
  if (!isConnected) {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Connect Wallet
        </button>

        {/* Connect Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
              ref={modalRef}
              className="bg-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl border border-slate-700"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Connect Wallet</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <p className="text-slate-400 text-sm mb-4">
                Connect using a decentralized method - no external services required.
              </p>

              <div className="space-y-3">
                {connectors.map((walletConnector) => (
                  <button
                    key={walletConnector.id}
                    onClick={() => handleConnect(walletConnector.id)}
                    disabled={isPending}
                    className="w-full flex items-center gap-4 p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all duration-200 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-2xl">
                      {getWalletIcon(walletConnector.name)}
                    </span>
                    <div className="flex-1 text-left">
                      <p className="font-semibold">{walletConnector.name}</p>
                      <p className="text-xs text-slate-400">
                        {walletConnector.id === "injected"
                          ? "Browser Extension"
                          : "Direct Connection"}
                      </p>
                    </div>
                    {isPending && (
                      <div className="animate-spin h-5 w-5 border-2 border-purple-500 border-t-transparent rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-900/30 border border-red-700 rounded-lg">
                  <p className="text-red-400 text-sm">{error.message}</p>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-slate-700">
                <p className="text-xs text-slate-500 text-center">
                  🔒 Decentralized connection - No WalletConnect dependency
                </p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Connected - show account info
  return (
    <div className="flex items-center gap-2">
      {/* Chain Selector */}
      <div className="relative" ref={chainMenuRef}>
        <button
          onClick={() => setIsChainMenuOpen(!isChainMenuOpen)}
          className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-2 px-3 rounded-lg transition-all duration-200"
        >
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="hidden sm:inline text-sm">{currentChain.name}</span>
          <svg
            className={`w-4 h-4 transition-transform ${isChainMenuOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isChainMenuOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-2 z-50 max-h-80 overflow-y-auto">
            <p className="px-4 py-2 text-xs text-slate-400 font-semibold uppercase">
              Switch Network
            </p>
            {allChains.map((chain) => (
              <button
                key={chain.id}
                onClick={() => handleSwitchChain(chain.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-700 transition-colors ${
                  chain.id === chainId ? "bg-slate-700" : ""
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    chain.id === chainId ? "bg-green-500" : "bg-slate-500"
                  }`}
                />
                <span className="text-white text-sm">{chain.name}</span>
                {chain.id === chainId && (
                  <span className="ml-auto text-green-500 text-xs">Connected</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Account Button */}
      <div className="relative" ref={accountMenuRef}>
        <button
          onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
          className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-2 px-3 rounded-lg transition-all duration-200"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs">
            {getWalletIcon(connector?.name || "")}
          </div>
          <span className="hidden sm:inline text-sm">
            {accountStatus.largeScreen === "full" && balance
              ? `${formatBalance(balance.formatted)} ${balance.symbol}`
              : formatAddress(address!)}
          </span>
          <span className="sm:hidden text-sm">{formatAddress(address!)}</span>
        </button>

        {isAccountMenuOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-2 z-50">
            <div className="px-4 py-3 border-b border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Connected with {connector?.name}</p>
              <p className="text-white font-mono text-sm">{formatAddress(address!)}</p>
              {balance && (
                <p className="text-slate-300 text-sm mt-1">
                  {formatBalance(balance.formatted)} {balance.symbol}
                </p>
              )}
            </div>

            <button
              onClick={copyAddress}
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-700 transition-colors text-white"
            >
              <span>📋</span>
              <span className="text-sm">Copy Address</span>
            </button>

            <a
              href={`${currentChain.blockExplorers?.default.url}/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-700 transition-colors text-white"
            >
              <span>🔍</span>
              <span className="text-sm">View on Explorer</span>
            </a>

            <div className="border-t border-slate-700 mt-2 pt-2">
              <button
                onClick={handleDisconnect}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-900/30 transition-colors text-red-400"
              >
                <span>🔌</span>
                <span className="text-sm">Disconnect</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectWallet;
