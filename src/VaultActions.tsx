import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";
import vaultabi from "./abi/vaultabi.json";
import { useAccount } from "wagmi";
//import { sepolia } from "viem/chains";
import { useParams } from "react-router-dom";
import { citreaTestnet } from "./CitreaTestnet";

type Inputs = {
  ethAmount: string;
};

const VaultActions: React.FC<{ withdrawalAddress?: string }> = ({
  withdrawalAddress,
}) => {
  const { address } = useParams<{ address: `0x${string}` }>();
  const { writeContractAsync } = useWriteContract();
  //const vaultDetails = response?.data as VaultDetailsType;
  const [activeTab, setActiveTab] = useState("Fund Project");

  const account = useAccount();
  const nativecurrency = account.chain?.nativeCurrency.name;

  const tabs = [
    "Fund Project",
    "Refund",
    "Redeem",
    "Withdraw Funds",
    "Add PKT",
    "Withdraw Unsold PTK",
  ];
  const visibleTabs =
    account.address === withdrawalAddress
      ? tabs
      : tabs.filter(
          (tab) =>
            tab === "Fund Project" || tab === "Refund" || tab === "Redeem",
        );

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
        chainId: citreaTestnet.id,
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
        chainId: citreaTestnet.id,
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
        chainId: citreaTestnet.id,
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
        chainId: citreaTestnet.id,
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
        chainId: citreaTestnet.id,
      });
      // Wait for approximately 6 seconds for 3 block confirmations
      await new Promise((resolve) => setTimeout(resolve, 6000));
      console.log("1st Transaction submitted:", tx1);
    } catch (error) {
      console.error("Contract call failed:", error);
    }
  };
  const handleRedeem = async () => {
    try {
      const tx1 = await writeContractAsync({
        abi: vaultabi,
        address: address as `0x${string}`,
        functionName: "redeem",
        chainId: citreaTestnet.id,
      });
      // Wait for approximately 6 seconds for 3 block confirmations
      await new Promise((resolve) => setTimeout(resolve, 6000));
      console.log("1st Transaction submitted:", tx1);
    } catch (error) {
      console.error("Contract call failed:", error);
    }
  };
  return (
    <div className="mb-5 space-y-6 bg-slate-900 px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 rounded-md border border-slate-950 text-white">
      <div>
        <h1 className="text-base sm:text-lg font-bold text-white">Vault Actions</h1>
        <div className="flex flex-wrap gap-2 sm:gap-4 border-b pt-3 sm:pt-5 overflow-x-auto">
          {visibleTabs.map((tab) => (
            <button
              key={tab}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap ${
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
                Fund the project and receive Proof-of-Funding tokens
              </p>
              <input
                className="input h-[34px] text-[14px] text-white/60 w-full sm:w-1/3 bg-slate-950 text-[#f4f4f5] px-3 py-2 rounded border border-white/10 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-[#09090b] transition-all duration-150 ease-in-out mb-2 sm:mb-0"
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
                className="flex h-[34px] sm:h-[34px] overflow-hidden items-center font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-950 text-white shadow hover:bg-black/90 px-3 sm:px-4 py-2 sm:max-w-52 whitespace-pre group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out border-2 border-purple-600/70 hover:border-purple-600 mt-3 text-sm sm:text-base"
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
                  Get a refund if the project did not manage to raise the
                  minimum amount by the deadline
                </p>
                <button
                  onClick={handleRefund}
                  disabled={!nativecurrency}
                  className="flex h-[34px] overflow-hidden items-center font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-950 text-white shadow hover:bg-black/90 px-3 sm:px-4 py-2 sm:max-w-52 whitespace-pre group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out border-2 border-purple-600/70 hover:border-purple-600 mt-3 text-sm sm:text-base"
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
          {activeTab === "Redeem" && (
            <p>
              <div>
                <p className="">Redeem your vouchers for CAT</p>
                <button
                  onClick={handleRedeem}
                  disabled={!nativecurrency}
                  className="flex h-[34px] overflow-hidden items-center font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-950 text-white shadow hover:bg-black/90 px-3 sm:px-4 py-2 sm:max-w-52 whitespace-pre group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out border-2 border-purple-600/70 hover:border-purple-600 mt-3 text-sm sm:text-base"
                >
                  <span className="absolute right-0 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-20 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>

                  <span className="text-white">
                    {nativecurrency
                      ? `${isSubmitting ? "Processing..." : `Redeem`}`
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
                className="flex h-[34px] overflow-hidden items-center font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-950 text-white shadow hover:bg-black/90 px-3 sm:px-4 py-2 sm:max-w-52 whitespace-pre group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out border-2 border-purple-600/70 hover:border-purple-600 mt-3 text-sm sm:text-base"
              >
                <span className="absolute right-0 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-20 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>

                <span className="text-white">
                  {isSubmitting ? "Processing..." : `Withdraw Funds`}
                </span>
              </button>
            </div>
          )}
          {activeTab === "Add PKT" && (
            <form onSubmit={handleSubmit2(onSubmitForm2)}>
              <p className="pb-5">Add more Proof-of-Funding Tokens</p>
              <input
                className="input h-[34px] text-[14px] text-white/60 w-full sm:w-1/3 bg-slate-950 text-[#f4f4f5] px-3 py-2 rounded border border-white/10 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-[#09090b] transition-all duration-150 ease-in-out mb-2 sm:mb-0"
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
              <button className="flex h-[34px] overflow-hidden items-center font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-950 text-white shadow hover:bg-black/90 px-3 sm:px-4 py-2 sm:max-w-52 whitespace-pre group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out border-2 border-purple-600/70 hover:border-purple-600 mt-3 text-sm sm:text-base">
                <span className="absolute right-0 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-20 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>

                <span className="text-white">
                  {isSubmitting2 ? "Processing..." : `Add PTKs`}
                </span>
              </button>
            </form>
          )}
          {activeTab === "Withdraw Unsold PTK" && (
            <form onSubmit={handleSubmit3(onSubmitForm3)}>
              <p className="pb-5">Withdraw Proof-of-Funding Tokens</p>
              <input
                className="input h-[34px] text-[14px] text-white/60 w-full sm:w-1/3 bg-slate-950 text-[#f4f4f5] px-3 py-2 rounded border border-white/10 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-[#09090b] transition-all duration-150 ease-in-out mb-2 sm:mb-0"
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
              <button className="flex h-[34px] overflow-hidden items-center font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-950 text-white shadow hover:bg-black/90 px-3 sm:px-4 py-2 sm:max-w-52 whitespace-pre group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out border-2 border-purple-600/70 hover:border-purple-600 mt-3 text-sm sm:text-base">
                <span className="absolute right-0 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-20 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>

                <span className="text-white">
                  {isSubmitting3 ? "Processing..." : `Withdraw PTKs`}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default VaultActions;
