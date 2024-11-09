import { useState, useEffect } from "react";
import { VaultArrayType } from "./ContractResponseTypes.ts";
import factoryabi from "./abi/factoryabi.json";
import { useReadContract } from "wagmi";
//import abi from "./abi/abi.json";
import { arbitrumSepolia } from "viem/chains";
const Home = () => {
  const [totalVaults, setTotalVaults] = useState<number>();
  const [start, setStart] = useState<number>();
  const [end, setEnd] = useState<number>();

  // First contract call
  const response = useReadContract({
    abi: factoryabi,
    address: "0x3d927Cf8E568856e379FDAaaa131d16aCa652e6d",
    functionName: "getTotalNumberOfFundingVaults",
    chainId: arbitrumSepolia.id,
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
    address: "0x3d927Cf8E568856e379FDAaaa131d16aCa652e6d",
    functionName: "getVaults",
    args: start && end ? [start, end] : undefined, // Only provide args when start and end are set
    chainId: arbitrumSepolia.id,
    query: {
      enabled:
        totalVaults !== undefined && start !== undefined && end !== undefined,
    },
  });

  const vaults = result?.data as VaultArrayType;

  return (
    <div id="projects" className="px-4 xl:px-28 lg:px-20 sm:px-8">
      <h1 className="text-3xl pt-16 font-bold text-white">
        All Funding Vaults
      </h1>
      <p className="text-slate-200 pt-3 pb-4">
        Each Funding Vault represents a funding project.
      </p>

      <div className="md:grid grid-cols-3 gap-6 py-4">
        {!result.isFetched &&
          Array.from({ length: 3 }, (_, index) => (
            <div key={index}>
              <div className="px-7 py-7 bg-slate-950 rounded-lg shadow-md text-white animate-pulse">
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

        {vaults?.map((vault) => (
          <div key={vault.vaultAddress}>
            <div className="px-7 py-7 bg-slate-950 rounded-lg shadow-md text-white">
              <h1 className="text-2xl  font-bold ">{vault.title}</h1>
              <p className="text-sm py-4 ">{vault.description}</p>
              <div className="flex flex-row justify-between py-4">
                {/* <h1 className="text-base  text-white">Minimum limit: 56 ETH</h1> */}
                <h1 className="text-base  ">
                  Created:{" "}
                  {new Date(Number(vault.deadline) * 1000).toLocaleString()}
                </h1>
              </div>
              <button className="min-w-full py-2  bg-slate-100 text-black hover:bg-purple-600 hover:text-white  rounded-md">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <a href="" target="_blank" rel="noopener noreferrer">
        <div className="flex flex-auto align-center justify-center">
          <button className=" text-white font-semibold rounded-md py-2 px-5 bg-purple-600 hover:bg-purple-700 ">
            More Projects
          </button>
        </div>
      </a>
    </div>
  );
};

export default Home;
