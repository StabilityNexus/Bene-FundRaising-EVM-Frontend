import vaultabi from "./abi/vaultabi.json";
import abi from "./abi/abi.json";
import { useReadContract } from "wagmi";
//import { sepolia } from "viem/chains";
import { useParams } from "react-router-dom";
import { VaultDetailsType } from "./ContractResponseTypes.ts";
import { formatEther } from "viem";
import { useBalance } from "wagmi";
// @ts-expect-error: TypeScript does not have type declarations for this module
import Microlink from "@microlink/react";
import VaultActions from "./VaultActions.tsx";
import Countdown from "./Countdown.tsx";
import { citreaTestnet } from "./CitreaTestnet.ts";

const Details = () => {
  // Placeholder example values for the funding vault
  const { address } = useParams<{ address: `0x${string}` }>();

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
    address: vaultDetails?.participationToken,
    functionName: "balanceOf",
    args: [address],
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

  console.log(balanceOfVault?.data?.value, vaultDetails?.minFundingAmount);
  return (
    <div>
      <div className="md:space-y-6 space-x-1 bg-slate-900 px-10 py-10 rounded-md border mx:1 md:mx-16 my-5 border-slate-950 text-white">
        <div className="md:space-y-6 space-x-1">
          {/* Stat Cards Section */}
          {!symbol && (
            <div>
              <div className="pb-6 h-11 bg-slate-800 rounded my-2 mx-2 w-72 animate-pulse"></div>
              <div className="flex flex-row flex-wrap xl:flex-nowrap gap-4 ">
                <div className="rounded-lg w-2/5 p-6 shadow-md border bg-slate-900  border-slate-950 ">
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-500 text-2xl">
                      {/* Icon placeholder */}
                      {/* <svg className="w-6 h-6" fill="currentColor"><!-- icon --></svg> */}
                    </div>
                    <div className="w-full my-12">
                      <div className="h-6 bg-slate-800 rounded my-2 mx-2 w-2/3 animate-pulse"></div>
                      <div className="h-4 bg-slate-800 rounded my-2 mx-2 w-4/5 animate-pulse"></div>
                      <div className="h-6 bg-slate-800 rounded my-2 mx-2 w-2/3 animate-pulse"></div>
                      <div className="h-4 bg-slate-800 rounded my-2 mx-2 w-4/5 animate-pulse"></div>
                      <div className="h-6 bg-slate-800 rounded my-2 mx-2 w-2/3 animate-pulse"></div>
                      <div className="h-4 bg-slate-800 rounded my-2 mx-2 w-4/5 animate-pulse"></div>
                      <div className="h-6 bg-slate-800 rounded my-2 mx-2 w-2/3 animate-pulse"></div>
                      <div className="h-4 bg-slate-800 rounded my-2 mx-2 w-4/5 animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <div className="w-3/5 mt-4">
                  <div className="mb-4 rounded-lg p-6 shadow-md border bg-slate-900 border-slate-950">
                    <div className="flex items-center space-x-3">
                      <div className="text-red-500 text-2xl  my-7">
                        {/* <svg className="w-6 h-6" fill="currentColor"><!-- icon --></svg> */}
                      </div>
                      <div>
                        <div className="h-4 bg-slate-800 rounded my-2 mx-2 w-96 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  <div className=" mb-4 rounded-lg p-6 shadow-md border bg-slate-900 border-slate-950">
                    <div className="flex items-center space-x-3">
                      <div className="text-red-500 text-2xl  my-7"></div>
                      <div>
                        <div className="h-4 bg-slate-800 rounded my-2 mx-2 w-96 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  <div className="  rounded-lg p-6 shadow-md border bg-slate-900 border-slate-950">
                    <div className="flex items-center space-x-3">
                      <div className="text-red-500 text-2xl  my-7"></div>
                      <div>
                        <div className="h-4 bg-slate-800 rounded my-2 mx-2 w-96 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-[40%_60%] py-3">
                {/* Detailed Cards Section */}
                <div>
                  <div className="mb-5 rounded-lg shadow-md border p-6 bg-slate-900 border-slate-950">
                    <div className="flex items-center mb-4">
                      <div className="mr-4 p-3 rounded-full text-2xl">📝</div>
                      <div className="h-6 bg-slate-800 rounded my-2 mx-2 w-28 animate-pulse"></div>
                    </div>
                    <div className="h-4 bg-slate-800 rounded my-2 mx-2 w-36 animate-pulse"></div>
                    <div className="bg-slate-950 text-xs font-mono p-2 rounded break-all animate-pulse"></div>
                  </div>

                  <div className=" rounded-lg shadow-md border p-6 bg-slate-900 border-slate-950">
                    <div className="flex items-center mb-4">
                      <div className="mr-4 p-3 rounded-full text-2xl"> 👨🏻‍💼</div>
                      <div className="h-6 bg-slate-800 rounded my-2 mx-2 w-28 animate-pulse"></div>
                    </div>
                    <div className="h-4 bg-slate-800 rounded my-2 mx-2 w-36 animate-pulse"></div>
                  </div>
                </div>
                <div className="border border-slate-950 shadow-md">
                  <div className="h-6  bg-slate-800 rounded my-2 mx-2 w-28 animate-pulse"></div>
                  <div className="flex">
                    <div className="h-6 bg-slate-800 rounded my-2 mx-2 w-28 animate-pulse"></div>
                    <div className="h-6 bg-slate-800 rounded my-2 mx-2 w-28 animate-pulse"></div>
                    <div className="h-6 bg-slate-800 rounded my-2 mx-2 w-28 animate-pulse"></div>
                    <div className="h-6 bg-slate-800 rounded my-2 mx-2 w-28 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {balanceOfVault.data && symbol && VaultCAT && vaultDetails && (
            <div>
              <h1 className="text-2xl font-bold text-white pb-6 ">
                {vaultDetails.projectTitle}
              </h1>
              <div className="flex flex-row flex-wrap xl:flex-nowrap justify-around">
                <div className="xl:w-1/2 w-full ">
                  <Microlink
                    url={vaultDetails.projectURL}
                    size="large"
                    rounded="5"
                    contrast
                  />
                </div>
                <div className="xl:w-full w-full">
                  <div className=" xl:ml-5 my-5 px-5 py-5 border border-slate-950 shadow-md">
                    <h1 className="text-slate-400">Proof-of-Funding Tokens</h1>
                    <p>
                      {formatEther(BigInt(VaultCAT))} {symbol} Remaining out of{" "}
                      {formatEther(
                        BigInt(vaultDetails.participationTokenAmount),
                      )}{" "}
                      {symbol}
                    </p>
                    <div
                      className=" flex w-full h-2  rounded-full overflow-hidden bg-slate-950"
                      role="progressbar"
                      aria-valuenow={25}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="flex flex-col h-2 content-center overflow-hidden bg-purple-500 text-xs text-white text-center whitespace-nowrap transition duration-500 "
                        style={{
                          width: `${(Number(VaultCAT) / Number(vaultDetails.participationTokenAmount)) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className=" xl:ml-5 my-5 px-5 py-5 border border-slate-950 shadow-md">
                    <h1 className="text-slate-400">Funds Collected</h1>
                    <p>
                      {formatEther(balanceOfVault?.data?.value as bigint)}{" "}
                      {balanceOfVault?.data?.symbol} Funds raised of{" "}
                      {formatEther(BigInt(vaultDetails.minFundingAmount))}{" "}
                      {balanceOfVault?.data?.symbol}
                    </p>
                    <div
                      className=" flex w-full h-2  rounded-full overflow-hidden bg-slate-950"
                      role="progressbar"
                      aria-valuenow={25}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="flex flex-col h-2 content-center overflow-hidden bg-purple-500 text-xs text-white text-center whitespace-nowrap transition duration-500 "
                        style={{
                          width: `${(Number(balanceOfVault?.data?.value) / Number(vaultDetails.minFundingAmount)) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="xl:ml-5 my-5 px-5 py-5 rounded-lg  shadow-md border  border-slate-950">
                    <div>
                      <h3 className="text-slate-400">Time Left</h3>

                      <Countdown
                        targetTimestamp={Number(vaultDetails.timeStamp) * 1000}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-[40%_60%] py-3">
                <div className="">
                  <div className="mb-4  rounded-lg shadow-md border p-6 bg-slate-900 border-slate-950">
                    <div className="flex items-center mb-4">
                      <div className="mr-4 p-3 rounded-full text-2xl">📝</div>
                      <h3 className="text-lg font-semibold">Description</h3>
                    </div>
                    <p className="text-sm text-slate-400">
                      {vaultDetails.projectDescription}
                    </p>
                  </div>
                  <div className=" rounded-lg shadow-md border p-6 bg-slate-900 border-slate-950">
                    <div className="flex items-center mb-4">
                      <div className="mr-4 p-3 rounded-full text-2xl">👨🏻‍💼</div>
                      <h3 className="text-lg font-semibold">Creator</h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      Wallet Address:
                    </p>
                    <div className="bg-slate-950 text-xs font-mono p-2 rounded break-all">
                      {vaultDetails.withdrawlAddress}
                    </div>
                  </div>
                </div>
                <div>
                  {balanceOfVault.data && VaultCAT && vaultDetails && (
                    <VaultActions
                      withdrawalAddress={vaultDetails?.withdrawlAddress}
                    />
                  )}
                </div>
              </div>

              <div className="flex place-content-center py-3">
                <a
                  href={vaultDetails.projectURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-60 overflow-hidden items-center font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-950 text-white shadow hover:bg-black/90 px-4 py-2 max-w-52 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out  border-2 border-purple-600/70 hover:border-purple-600 mt-3"
                >
                  <span className="absolute right-0 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-20 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>

                  <span className="text-white">Explore More about Project</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* {balanceOfVault.data && VaultCAT && vaultDetails && (
        <VaultActions withdrawalAddress={vaultDetails?.withdrawlAddress} />
      )} */}
    </div>
  );
};

export default Details;
