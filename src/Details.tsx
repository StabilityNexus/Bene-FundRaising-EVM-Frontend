import vaultabi from "./abi/vaultabi.json";
import abi from "./abi/abi.json";
import { useReadContract, useBalance } from "wagmi";
import { useParams } from "react-router-dom";
import { VaultDetailsType } from "./ContractResponseTypes.ts";
import { formatEther } from "viem";
import { useState } from "react";
// @ts-expect-error: TypeScript does not have type declarations for this module
import Microlink from "@microlink/react";
import VaultActions from "./VaultActions.tsx";
import Countdown from "./Countdown.tsx";
import { citreaTestnet } from "./CitreaTestnet.ts";
import ShareModal from "./ShareModal";

const Details = () => {
  const { address } = useParams<{ address: `0x${string}` }>();
  const [openShare, setOpenShare] = useState(false);

  const balanceOfVault = useBalance({
    address: address,
    chainId: citreaTestnet.id,
  });

  const response = useReadContract({
    abi: vaultabi,
    address: address,
    functionName: "getVaults",
    chainId: citreaTestnet.id,
    query: {
      enabled: balanceOfVault?.data?.value !== undefined,
    },
  });

  let vaultDetails;
  if (response.isFetched) {
    vaultDetails = response?.data as VaultDetailsType;
  }

  const result = useReadContract({
    abi: abi,
    address: address,
    functionName: "totalSupply",
    chainId: citreaTestnet.id,
    query: {
      enabled: balanceOfVault !== undefined,
    },
  });

  const VaultCAT = result?.data as string;

  const _symbol = useReadContract({
    abi: abi,
    address: vaultDetails?.participationToken,
    functionName: "symbol",
    chainId: citreaTestnet.id,
    query: {
      enabled: VaultCAT !== undefined,
    },
  });

  const symbol = _symbol?.data as string;

  return (
    <div>
      <div className="md:space-y-6 space-x-1 bg-slate-900 px-10 py-10 rounded-md border mx:1 md:mx-16 my-5 border-slate-950 text-white">
        {balanceOfVault.data && symbol && vaultDetails && (
          <div>
            {/* Title + Share */}
            <div className="flex justify-between items-center pb-6">
              <h1 className="text-2xl font-bold">
                {vaultDetails.projectTitle}
              </h1>
              <button
                onClick={() => setOpenShare(true)}
                className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white"
              >
                Share
              </button>
            </div>

            <div className="flex flex-row flex-wrap xl:flex-nowrap justify-around">
              <div className="xl:w-1/2 w-full">
                <Microlink
                  url={vaultDetails.projectURL}
                  size="large"
                  rounded="5"
                  contrast
                />
              </div>

              <div className="xl:w-full w-full">
                <div className="xl:ml-5 my-5 px-5 py-5 border border-slate-950 shadow-md">
                  <h1 className="text-slate-400">Proof-of-Funding Tokens</h1>
                  <p>
                    {formatEther(
                      BigInt(vaultDetails.participationTokenAmount) -
                        BigInt(VaultCAT),
                    )}{" "}
                    {symbol} remaining
                  </p>
                </div>

                <div className="xl:ml-5 my-5 px-5 py-5 border border-slate-950 shadow-md">
                  <h1 className="text-slate-400">Funds Collected</h1>
                  <p>
                    {formatEther(balanceOfVault.data.value)}{" "}
                    {balanceOfVault.data.symbol}
                  </p>
                </div>

                <div className="xl:ml-5 my-5 px-5 py-5 rounded-lg shadow-md border border-slate-950">
                  <h3 className="text-slate-400">Time Left</h3>
                  <Countdown
                    targetTimestamp={Number(vaultDetails.timeStamp) * 1000}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[40%_60%] py-3">
              <div>
                <div className="mb-4 rounded-lg shadow-md border p-6 bg-slate-900 border-slate-950">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-sm text-slate-400">
                    {vaultDetails.projectDescription}
                  </p>
                </div>

                <div className="rounded-lg shadow-md border p-6 bg-slate-900 border-slate-950">
                  <h3 className="text-lg font-semibold mb-2">Creator</h3>
                  <div className="bg-slate-950 text-xs font-mono p-2 rounded break-all">
                    {vaultDetails.withdrawlAddress}
                  </div>
                </div>
              </div>

              <div>
                <VaultActions
                  withdrawalAddress={vaultDetails.withdrawlAddress}
                />
              </div>
            </div>

            <div className="flex place-content-center py-3">
              <a
                href={vaultDetails.projectURL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-950 border border-purple-600 px-4 py-2 rounded-md hover:bg-black"
              >
                Explore More about Project
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {vaultDetails && (
        <ShareModal
          open={openShare}
          onClose={() => setOpenShare(false)}
          title={vaultDetails.projectTitle}
        />
      )}
    </div>
  );
};

export default Details;
