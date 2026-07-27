import { useAccount, useChainId } from "wagmi"

export function useWallet() {
  const { address, isConnected, connector } = useAccount()
  const chainId = useChainId()

  return {
    address,
    isConnected,
    chainId,
    connector,
  }
}
