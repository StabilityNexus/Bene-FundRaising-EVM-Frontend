import vaultabi from "./abi/vaultabi.json";
import abi from "./abi/abi.json";
import { useReadContract, useWriteContract } from "wagmi";
import { arbitrumSepolia } from "viem/chains";
import { useParams } from "react-router-dom";
import { VaultDetailsType } from "./ContractResponseTypes.ts";
import { formatEther, parseEther } from "viem";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useForm, SubmitHandler } from "react-hook-form";
import { useBalance } from "wagmi";

type Inputs = {
  ethAmount: string;
};

const Details = () => {
  // Placeholder example values for the funding vault
  const { address } = useParams<{ address: `0x${string}` }>();
  const { writeContractAsync } = useWriteContract();

  const response = useReadContract({
    abi: vaultabi,
    address: address,
    functionName: "getVaults",
    chainId: arbitrumSepolia.id,
  });
  let vaultDetails;
  if (response.isFetched) {
    vaultDetails = response?.data as VaultDetailsType;
  }

  // Second contract call, triggered only when `totalVaults`, `start`, and `end` are defined
  const result = useReadContract({
    abi: abi,
    address: vaultDetails?.participationToken,
    functionName: "balanceOf",
    args: [address],
    chainId: arbitrumSepolia.id,
    query: {
      enabled: vaultDetails !== undefined,
    },
  });

  const VaultCAT = result?.data as string;

  const balanceOfVault = useBalance({
    address: address,
    query: {
      enabled: VaultCAT !== undefined,
    },
  });

  //const vaultDetails = response?.data as VaultDetailsType;
  const [activeTab, setActiveTab] = useState("Fund Project");

  const account = useAccount();
  const nativecurrency = account.chain?.nativeCurrency.name;

  const tabs = [
    "Fund Project",
    "Refund",
    "Withdraw Funds",
    "Add CAT",
    "Withdraw Unsold CAT",
  ];
  const visibleTabs =
    account.address === vaultDetails?.withdrawlAddress
      ? tabs
      : tabs.filter((tab) => tab === "Fund Project" || tab === "Refund");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>();
  const onSubmitForm1: SubmitHandler<Inputs> = async (data) => {
    try {
      const tx1 = await writeContractAsync({
        abi: vaultabi,
        address: address as `0x${string}`,
        functionName: "purchaseTokens",
        value: parseEther(data.ethAmount),
        chainId: arbitrumSepolia.id,
      });
      // Wait for approximately 6 seconds for 3 block confirmations
      await new Promise((resolve) => setTimeout(resolve, 6000));
      console.log("1st Transaction submitted:", tx1);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { isSubmitting: isSubmitting2 },
  } = useForm<Inputs>();
  const onSubmitForm2: SubmitHandler<Inputs> = async (data) => {
    try {
      const tx1 = await writeContractAsync({
        abi: vaultabi,
        address: address as `0x${string}`,
        functionName: "addTokens",
        args: [parseEther(data.ethAmount)],
        chainId: arbitrumSepolia.id,
      });
      // Wait for approximately 6 seconds for 3 block confirmations
      await new Promise((resolve) => setTimeout(resolve, 6000));
      console.log("1st Transaction submitted:", tx1);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };
  const {
    register: register3,
    handleSubmit: handleSubmit3,
    formState: { isSubmitting: isSubmitting3 },
  } = useForm<Inputs>();
  const onSubmitForm3: SubmitHandler<Inputs> = async (data) => {
    try {
      const tx1 = await writeContractAsync({
        abi: vaultabi,
        address: address as `0x${string}`,
        functionName: "withdrawUnsoldTokens",
        args: [parseEther(data.ethAmount)],
        chainId: arbitrumSepolia.id,
      });
      // Wait for approximately 6 seconds for 3 block confirmations
      await new Promise((resolve) => setTimeout(resolve, 6000));
      console.log("1st Transaction submitted:", tx1);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  const handleWithdraw = async () => {
    try {
      const tx1 = await writeContractAsync({
        abi: vaultabi,
        address: address as `0x${string}`,
        functionName: "withdrawFunds",
        chainId: arbitrumSepolia.id,
      });
      // Wait for approximately 6 seconds for 3 block confirmations
      await new Promise((resolve) => setTimeout(resolve, 6000));
      console.log("1st Transaction submitted:", tx1);
    } catch (error) {
      console.error("Contract call failed:", error);
    }
  };

  const handleRefund = async () => {
    try {
      const tx1 = await writeContractAsync({
        abi: vaultabi,
        address: address as `0x${string}`,
        functionName: "refundTokens",
        chainId: arbitrumSepolia.id,
      });
      // Wait for approximately 6 seconds for 3 block confirmations
      await new Promise((resolve) => setTimeout(resolve, 6000));
      console.log("1st Transaction submitted:", tx1);
    } catch (error) {
      console.error("Contract call failed:", error);
    }
  };

  return (
    <div>
      <div className="space-y-6 bg-slate-900 px-10 py-10 rounded-md border mx-16 my-5 border-slate-950 text-white">
        <h1 className="text-2xl font-bold text-white">Vault Details</h1>
        <div className="space-y-6 ">
          {/* Stat Cards Section */}
          {!balanceOfVault.data && (
            <div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-5">
                <div className="rounded-lg p-6 shadow-md border bg-slate-900  border-slate-950 ">
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-500 text-2xl">
                      {/* Icon placeholder */}
                      {/* <svg className="w-6 h-6" fill="currentColor"><!-- icon --></svg> */}
                      🏴󠁩󠁤󠁳󠁬󠁿
                    </div>
                    <div>
                      <div className="h-6 bg-slate-800 rounded my-2 mx-2 w-28 animate-pulse"></div>
                      <div className="h-4 bg-slate-800 rounded my-2 mx-2 w-36 animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <div className=" bg-slate-900 rounded-lg p-6 shadow-md border border-slate-950">
                  <div className="flex items-center space-x-3">
                    <div className="text-green-500 text-2xl">
                      {/* <svg className="w-6 h-6" fill="currentColor"><!-- icon --></svg> */}
                      🥮
                    </div>
                    <div>
                      <div className="h-6 bg-slate-800 rounded my-2 mx-2 w-28 animate-pulse"></div>
                      <div className="h-4 bg-slate-800 rounded my-2 mx-2 w-36 animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg p-6 shadow-md border bg-slate-900 border-slate-950">
                  <div className="flex items-center space-x-3">
                    <div className="text-purple-500 text-2xl">
                      {/* <svg className="w-6 h-6" fill="currentColor"><!-- icon --></svg> */}
                      🥮
                    </div>
                    <div>
                      <div className="h-6 bg-slate-800 rounded my-2 mx-2 w-28"></div>
                      <div className="h-4 bg-slate-800 rounded my-2 mx-2 w-36"></div>
                    </div>
                  </div>
                </div>
                <div className=" rounded-lg p-6 shadow-md border bg-slate-900 border-slate-950">
                  <div className="flex items-center space-x-3">
                    <div className="text-red-500 text-2xl">
                      {/* <svg className="w-6 h-6" fill="currentColor"><!-- icon --></svg> */}
                      📅
                    </div>
                    <div>
                      <div className="h-6 bg-slate-800 rounded my-2 mx-2 w-28 animate-pulse"></div>
                      <div className="h-4 bg-slate-800 rounded my-2 mx-2 w-36 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 py-5">
                <div className=" bg-slate-900 rounded-lg p-6 shadow-md border border-slate-950">
                  <div className="flex items-center space-x-3">
                    <div className="text-green-500 text-2xl">
                      {/* <svg className="w-6 h-6" fill="currentColor"><!-- icon --></svg> */}
                      💰
                    </div>
                    <div>
                      <div className="h-6 bg-slate-800 rounded my-2 mx-2 w-28 animate-pulse"></div>
                      <div className="h-4 bg-slate-800 rounded my-2 mx-2 w-36 animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg p-6 shadow-md border bg-slate-900 border-slate-950">
                  <div className="flex items-center space-x-3">
                    <div className="text-purple-500 text-2xl">
                      {/* <svg className="w-6 h-6" fill="currentColor"><!-- icon --></svg> */}
                      💰
                    </div>
                    <div>
                      <div className="h-6 bg-slate-800 rounded my-2 mx-2 w-28"></div>
                      <div className="h-4 bg-slate-800 rounded my-2 mx-2 w-36"></div>
                    </div>
                  </div>
                </div>
                <div className=" rounded-lg p-6 shadow-md border bg-slate-900 border-slate-950">
                  <div className="flex items-center space-x-3">
                    <div className="text-red-500 text-2xl">
                      {/* <svg className="w-6 h-6" fill="currentColor"><!-- icon --></svg> */}
                      💰
                    </div>
                    <div>
                      <div className="h-6 bg-slate-800 rounded my-2 mx-2 w-28 animate-pulse"></div>
                      <div className="h-4 bg-slate-800 rounded my-2 mx-2 w-36 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Detailed Cards Section */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className=" rounded-lg shadow-md border p-6 bg-slate-900 border-slate-950">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 p-3 rounded-full text-2xl">
                      {/* <svg className="w-6 h-6 text-gray-600"><!-- icon --></svg>
                ✌ */}
                      👨🏻‍💼
                    </div>
                    <div className="h-6 bg-slate-800 rounded my-2 mx-2 w-28 animate-pulse"></div>
                  </div>
                  <div className="h-4 bg-slate-800 rounded my-2 mx-2 w-36 animate-pulse"></div>
                  <div className="bg-slate-950 text-xs font-mono p-2 rounded break-all animate-pulse"></div>
                </div>

                <div className=" rounded-lg shadow-md border p-6 bg-slate-900 border-slate-950">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 p-3 rounded-full text-2xl">
                      {/* <svg className="w-6 h-6 text-gray-600"><!-- icon --></svg>
                ✌ */}
                      📝
                    </div>
                    <div className="h-6 bg-slate-800 rounded my-2 mx-2 w-28 animate-pulse"></div>
                  </div>
                  <div className="h-4 bg-slate-800 rounded my-2 mx-2 w-36 animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
          {balanceOfVault.data && VaultCAT && vaultDetails && (
            <div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-5">
                <div className="rounded-lg p-6 shadow-md border bg-slate-900  border-slate-950 ">
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-500 text-2xl">
                      {/* Icon placeholder */}
                      {/* <svg className="w-6 h-6" fill="currentColor"><!-- icon --></svg> */}
                      🏴󠁩󠁤󠁳󠁬󠁿
                    </div>
                    <div>
                      <h3 className="text-slate-400">Project Title</h3>
                      <p className=" text-lg font-semibold">
                        {vaultDetails?.projectTitle}
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" bg-slate-900 rounded-lg p-6 shadow-md border border-slate-950">
                  <div className="flex items-center space-x-3">
                    <div className="text-green-500 text-2xl">
                      {/* <svg className="w-6 h-6" fill="currentColor"><!-- icon --></svg> */}
                      🥮
                    </div>
                    <div>
                      <h3 className="text-slate-400">Total CATs</h3>
                      <p className="text-lg font-semibold">
                        {formatEther(
                          BigInt(vaultDetails.participationTokenAmount),
                        )}{" "}
                        Tokens
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" bg-slate-900 rounded-lg p-6 shadow-md border border-slate-950">
                  <div className="flex items-center space-x-3">
                    <div className="text-green-500 text-2xl">
                      {/* <svg className="w-6 h-6" fill="currentColor"><!-- icon --></svg> */}
                      🥮
                    </div>
                    <div>
                      <h3 className="text-slate-400">Available CATs</h3>
                      <p className="text-lg font-semibold">
                        {formatEther(BigInt(VaultCAT))} Tokens
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" rounded-lg p-6 shadow-md border bg-slate-900 border-slate-950">
                  <div className="flex items-center space-x-3">
                    <div className="text-red-500 text-2xl">
                      {/* <svg className="w-6 h-6" fill="currentColor"><!-- icon --></svg> */}
                      📅
                    </div>
                    <div>
                      <h3 className="text-slate-400">Tally Date</h3>
                      <p className="text-lg font-semibold">
                        {new Date(
                          Number(vaultDetails.timeStamp) * 1000,
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 py-5">
                <div className="rounded-lg p-6 shadow-md border bg-slate-900 border-slate-950">
                  <div className="flex items-center space-x-3">
                    <div className="text-purple-500 text-2xl">
                      {/* <svg className="w-6 h-6" fill="currentColor"><!-- icon --></svg> */}
                      💰
                    </div>
                    <div>
                      <h3 className="text-slate-400">Minimum Funding Goal</h3>
                      <p className="text-lg font-semibold">
                        {formatEther(BigInt(vaultDetails.minFundingAmount))}{" "}
                        {balanceOfVault?.data?.symbol}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg p-6 shadow-md border bg-slate-900 border-slate-950">
                  <div className="flex items-center space-x-3">
                    <div className="text-purple-500 text-2xl">
                      {/* <svg className="w-6 h-6" fill="currentColor"><!-- icon --></svg> */}
                      💰
                    </div>
                    <div>
                      <h3 className="text-slate-400">Funds Collected</h3>
                      <p className="text-lg font-semibold">
                        {formatEther(balanceOfVault?.data?.value as bigint)}{" "}
                        {balanceOfVault?.data?.symbol}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg p-6 shadow-md border bg-slate-900 border-slate-950">
                  <div className="flex items-center space-x-3">
                    <div className="text-purple-500 text-2xl">
                      {/* <svg className="w-6 h-6" fill="currentColor"><!-- icon --></svg> */}
                      💰
                    </div>
                    <div>
                      <h3 className="text-slate-400">Funds Remaining</h3>
                      <p className="text-lg font-semibold">
                        {formatEther(
                          BigInt(vaultDetails.minFundingAmount) -
                            (balanceOfVault?.data?.value as bigint),
                        )}{" "}
                        {balanceOfVault?.data?.symbol}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Cards Section */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className=" rounded-lg shadow-md border p-6 bg-slate-900 border-slate-950">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 p-3 rounded-full text-2xl">
                      {/* <svg className="w-6 h-6 text-gray-600"><!-- icon --></svg>
                  ✌ */}
                      👨🏻‍💼
                    </div>
                    <h3 className="text-lg font-semibold">Creator</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Wallet Address:</p>
                  <div className="bg-slate-950 text-xs font-mono p-2 rounded break-all">
                    {vaultDetails.withdrawlAddress}
                  </div>
                </div>

                <div className=" rounded-lg shadow-md border p-6 bg-slate-900 border-slate-950">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 p-3 rounded-full text-2xl">
                      {/* <svg className="w-6 h-6 text-gray-600"><!-- icon --></svg>
                  ✌ */}
                      📝
                    </div>
                    <h3 className="text-lg font-semibold">Description</h3>
                  </div>
                  <p className="text-sm text-slate-400">
                    {vaultDetails.projectDescription}
                  </p>
                </div>
              </div>

              <div className="flex place-content-center pt-3">
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
      <div className=" mb-5 space-y-6 bg-slate-900 px-10 py-10 rounded-md border mx-16 my-5 border-slate-950 text-white">
        {/* <h1 className="text-2xl font-bold text-white">Vault Actions</h1>
        <div className="flex flex-row flex-wrap gap-2">
          <div className="w-80 hidden md:block">
            <label className="mb-2 text-sm font-medium sr-only bg-slate-950 text-white">
              Fund
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-slate-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-full p-2 ps-10  border-2 rounded bg-slate-900 border-purple-600/70 placeholder-slate-400 text-white hover:border-purple-600 hover:shadow-sm hover:shadow-white"
                placeholder="Fund the project"
                required
              />
            </div>
          </div>
          <button className="w-80 border-purple-600/70 border-2 rounded text-slate-400 hover:text-white  hover:border-purple-600 hover:shadow-sm hover:shadow-white">
            Refund
          </button>
          <button className="w-80 border-purple-600/70 border-2 rounded text-slate-400 hover:text-white  hover:border-purple-600 hover:shadow-sm hover:shadow-white">
            Withdraw Funds
          </button>
          <div className="w-80 hidden md:block">
            <label className="mb-2 text-sm font-medium sr-only bg-slate-950 text-white">
              Withdraw CAT
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-slate-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-full p-2 ps-10  border-2 rounded bg-slate-900 border-purple-600/70 placeholder-slate-400 text-white hover:border-purple-600 hover:shadow-sm hover:shadow-white"
                placeholder="Withdraw CAT"
                required
              />
            </div>
          </div>
          <div className="w-80 hidden md:block">
            <label className="mb-2 text-sm font-medium sr-only bg-slate-950 text-white">
              Add CAT
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-slate-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-full p-2 ps-10  border-2 rounded bg-slate-900 border-purple-600/70 placeholder-slate-400 text-white hover:border-purple-600 hover:shadow-sm hover:shadow-white"
                placeholder="Add CAT"
                required
              />
            </div>
          </div>
        </div> */}
        <div>
          <h1 className="text-2xl font-bold text-white">Vault Actions</h1>
          <div className="flex space-x-4 border-b pt-5">
            {visibleTabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 ${
                  activeTab === tab
                    ? "border-t border-purple-400 text-purple-400"
                    : "text-white"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-4">
            {activeTab === "Fund Project" && (
              <form onSubmit={handleSubmit(onSubmitForm1)}>
                <p className="pb-5">
                  Fund the project and receive Participation tokens
                </p>
                <input
                  className="input h-[34px]  text-[14px] text-white/60 w-1/3 bg-slate-950 text-[#f4f4f5] px-3 py-2 rounded border border-white/10 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-[#09090b] transition-all duration-150 ease-in-out"
                  type="number"
                  step="any"
                  {...register("ethAmount", { required: true })}
                  placeholder={
                    nativecurrency
                      ? `Enter Amount to donate in ${nativecurrency}`
                      : "Connect Wallet to proceed"
                  }
                  disabled={!nativecurrency}
                />
                <button
                  disabled={!nativecurrency}
                  className="flex h-[34px] min-w-60 overflow-hidden items-center font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-950 text-white shadow hover:bg-black/90 px-4 py-2 max-w-52 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out  border-2 border-purple-600/70 hover:border-purple-600 mt-3"
                >
                  <span className="absolute right-0 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-20 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>

                  <span className="text-white">
                    {nativecurrency
                      ? `${isSubmitting ? "Processing..." : `Send ${nativecurrency}`}`
                      : "Connect Wallet"}
                  </span>
                </button>
              </form>
            )}
            {activeTab === "Refund" && (
              <p>
                <div>
                  <p className="">
                    Skeptical about project Ligitimacy? Refund Your donations
                  </p>
                  <button
                    onClick={handleRefund}
                    disabled={!nativecurrency}
                    className="flex h-[34px] min-w-60 overflow-hidden items-center font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-950 text-white shadow hover:bg-black/90 px-4 py-2 max-w-52 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out  border-2 border-purple-600/70 hover:border-purple-600 mt-3"
                  >
                    <span className="absolute right-0 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-20 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>

                    <span className="text-white">
                      {nativecurrency
                        ? `${isSubmitting ? "Processing..." : `Refund`}`
                        : "Connect Wallet"}
                    </span>
                  </button>
                </div>
              </p>
            )}
            {activeTab === "Withdraw Funds" && (
              <div>
                <p className="">Withdraw Funds</p>
                <button
                  onClick={handleWithdraw}
                  className="flex h-[34px] min-w-60 overflow-hidden items-center font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-950 text-white shadow hover:bg-black/90 px-4 py-2 max-w-52 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out  border-2 border-purple-600/70 hover:border-purple-600 mt-3"
                >
                  <span className="absolute right-0 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-20 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>

                  <span className="text-white">
                    {isSubmitting ? "Processing..." : `Withdraw Funds`}
                  </span>
                </button>
              </div>
            )}
            {activeTab === "Add CAT" && (
              <form onSubmit={handleSubmit2(onSubmitForm2)}>
                <p className="pb-5">Add more Contribution Accounting Tokens</p>
                <input
                  className="input h-[34px]  text-[14px] text-white/60 w-1/3 bg-slate-950 text-[#f4f4f5] px-3 py-2 rounded border border-white/10 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-[#09090b] transition-all duration-150 ease-in-out"
                  type="number"
                  step="any"
                  {...register2("ethAmount", { required: true })}
                  placeholder={
                    nativecurrency
                      ? `Enter Amount of Tokens to add`
                      : "Connect Wallet to proceed"
                  }
                  disabled={!nativecurrency}
                />
                <button className="flex h-[34px] min-w-60 overflow-hidden items-center font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-950 text-white shadow hover:bg-black/90 px-4 py-2 max-w-52 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out  border-2 border-purple-600/70 hover:border-purple-600 mt-3">
                  <span className="absolute right-0 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-20 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>

                  <span className="text-white">
                    {isSubmitting2 ? "Processing..." : `Add CATs`}
                  </span>
                </button>
              </form>
            )}
            {activeTab === "Withdraw Unsold CAT" && (
              <form onSubmit={handleSubmit3(onSubmitForm3)}>
                <p className="pb-5">Withdraw Contribution Accounting Tokens</p>
                <input
                  className="input h-[34px]  text-[14px] text-white/60 w-1/3 bg-slate-950 text-[#f4f4f5] px-3 py-2 rounded border border-white/10 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-[#09090b] transition-all duration-150 ease-in-out"
                  type="number"
                  step="any"
                  {...register3("ethAmount", { required: true })}
                  placeholder={
                    nativecurrency
                      ? `Enter Amount of Tokens to Withdraw`
                      : "Connect Wallet to proceed"
                  }
                  disabled={!nativecurrency}
                />
                <button className="flex h-[34px] min-w-60 overflow-hidden items-center font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-950 text-white shadow hover:bg-black/90 px-4 py-2 max-w-52 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out  border-2 border-purple-600/70 hover:border-purple-600 mt-3">
                  <span className="absolute right-0 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-20 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>

                  <span className="text-white">
                    {isSubmitting3 ? "Processing..." : `Withdraw CATs`}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
