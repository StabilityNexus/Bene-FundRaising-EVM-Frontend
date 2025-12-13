import { useState, useEffect } from "react";
import { VaultArrayType } from "./ContractResponseTypes.ts";
import factoryabi from "./abi/factoryabi.json";
import { useReadContract } from "wagmi";
//import { sepolia } from "viem/chains";
import { useNavigate } from "react-router-dom";
import Countdown from "./Countdown.tsx";
import { citreaTestnet } from "./CitreaTestnet.ts";
const Home = () => {
  const [totalVaults, setTotalVaults] = useState<number>();
  const [start, setStart] = useState<number>();
  const [end, setEnd] = useState<number>();
  const navigate = useNavigate();

  // First contract call
  const response = useReadContract({
    abi: factoryabi,
    address: "0x7be12F651D421Edf31fd6488244aC20e8cEb5987",
    functionName: "getTotalNumberOfFundingVaults",
    chainId: citreaTestnet.id,
  });

  // Update totalVaults, start, and end only when `response` fetches new data
  useEffect(() => {
    if (response.isFetched) {
      const vaultCount = Number(response?.data);
      setTotalVaults(vaultCount);
      setStart(Math.max(vaultCount - 10, 1));
      setEnd(vaultCount);
    }
  }, [response.isFetched, response?.data]);

  // Second contract call, triggered only when `totalVaults`, `start`, and `end` are defined
  const result = useReadContract({
    abi: factoryabi,
    address: "0x7be12F651D421Edf31fd6488244aC20e8cEb5987",
    functionName: "getVaults",
    args: start && end ? [start, end] : undefined, // Only provide args when start and end are set
    chainId: citreaTestnet.id,
    query: {
      enabled:
        totalVaults !== undefined && start !== undefined && end !== undefined,
    },
  });

  const vaults = result?.data as VaultArrayType;

  const handleNavigate = (address: string) => {
    // Navigate to the details page with the vault address as a URL parameter
    navigate(`details/${address}`);
  };

  return (
    <div id="projects" className="px-2 sm:px-4 xl:px-28 lg:px-20 md:px-8">
      <h1 className="text-2xl sm:text-3xl pt-8 sm:pt-16 font-bold text-white">
        Projects Raising Funds
      </h1>
      <p className="text-slate-200 pt-2 sm:pt-3 pb-3 sm:pb-4 text-sm sm:text-base">
        Each Funding Vault represents a funding project.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 py-4">
        {!result.isFetched &&
          Array.from({ length: 3 }, (_, index) => (
            <div key={index}>
              <div className="px-7 py-7 bg-slate-950 rounded-lg shadow-md text-white animate-pulse ">
                <div className="h-6 bg-slate-800 rounded"></div>
                <div className="h-2 mt-8 bg-slate-800 rounded"></div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="h-2 bg-slate-900 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-900 rounded col-span-1"></div>
                </div>
                <div className="h-2 mt-4 bg-slate-800 rounded"></div>
                <div className="flex flex-row bg-slate-800 justify-between h-2 mt-10 my-4">
                  <h1 className="text-base"></h1>
                </div>
                <button className="min-w-full py-2 h-11 bg-slate-800 rounded-md"></button>
              </div>
            </div>
          ))}

        {vaults?.map((vault, index) => (
          <div key={vault.vaultAddress}>
            <div
              className="px-7 py-7  rounded-lg shadow-md text-white bg-no-repeat  bg-cover"
              style={{
                backgroundImage: `url(${index % 3 === 0 ? "card-3.svg" : index % 3 === 1 ? "card-2.svg" : "card-3.svg"})`,
              }}
            >
              <h1
                className={`text-xl sm:text-2xl font-bold ${index % 3 === 0 ? "text-[#5490ff]" : index % 3 === 1 ? "text-[#FFa500]" : "text-[#5490ff]"}`}
              >
                {vault.title}
              </h1>
              <p className="text-xs sm:text-sm my-3 sm:my-4 line-clamp-3 hover:line-clamp-none">
                {vault.description}
              </p>
              <div className="flex flex-row justify-between py-3 sm:py-4">
                <h1 className="text-sm sm:text-base">
                  Time Left:{" "}
                  <Countdown
                    targetTimestamp={Number(vault.deadline) * 1000}
                    variant="compact"
                  />
                </h1>
              </div>
              <div className="">
                <button
                  onClick={() => handleNavigate(vault.vaultAddress)}
                  className={`w-full flex overflow-hidden items-center font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-950 text-white shadow hover:bg-black/90 px-3 sm:px-4 py-2 sm:max-w-52 whitespace-pre group relative justify-center gap-2 rounded-md transition-all duration-300 ease-out border-2 text-sm sm:text-base ${
                    index % 3 === 0
                      ? "border-[#005aff]/70 hover:border-[#005aff]"
                      : index % 3 === 1
                        ? "border-[#FFa500]/70 hover:border-[#FFa500]"
                        : "border-[#005aff]/70 hover:border-[#005aff]"
                  }`}
                >
                  <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-20 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
                  <span className="text-white">View Details</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {end && start && end - start > 10 && (
        <a href="" target="_blank" rel="noopener noreferrer">
          <div className="flex flex-auto align-center justify-center mt-4">
            <button className="w-full sm:w-auto text-white font-semibold rounded-md py-2 px-5 bg-purple-600 hover:bg-purple-700 text-sm sm:text-base">
              More Projects
            </button>
          </div>
        </a>
      )}
    </div>
  );
};

export default Home;
