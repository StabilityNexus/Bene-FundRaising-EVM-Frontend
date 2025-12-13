import { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const Account = useAccount();
  const navigate = useNavigate();

  return (
    <div className="py-3 sm:py-5 bg-slate-950 flex flex-row justify-between align-middle flex-wrap px-2 sm:px-4">
      <div className="flex flex-row gap-2 sm:gap-6">
        <Link to={"/"} className="flex items-center">
          <img src="/Benelogo.svg" alt="" className="w-6 h-6 sm:w-8 sm:h-8 flex items mt-[1px]"/>
          <span className="text-xl sm:text-2xl px-1 font-bold text-white">Bene</span>
        </Link>
        <div className="w-40 sm:w-60 md:w-80 hidden md:block">
          <label className="mb-2 text-sm font-medium sr-only bg-slate-950 text-white">
            Search
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
              className="block w-full p-2 ps-10 text-sm  border rounded-sm bg-slate-900  border-slate-700 placeholder-zinc-400 text-white focus:ring-purple-800 focus:border-purple-800"
              placeholder="Search a Funding Vault"
              required
            />
          </div>
        </div>
      </div>
      <button
        className="text-white text-xl sm:text-2xl xl:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? "✖️" : "☰"}
      </button>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } xl:flex flex flex-col xl:flex-row xl:justify-items-center w-full xl:w-auto gap-3 sm:gap-4 mt-4 xl:mt-0`}
      >
        {Account.address ? (
          <button
            onClick={() => {
              if (Account.address) navigate("/create");
            }}
            className="text-white bg-zinc-800 font-bold text-xs sm:text-sm h-9 sm:h-10 hover:bg-zinc-900 px-2 sm:px-3 rounded-lg shadow-md w-full sm:w-auto"
          >
            <span className="hidden sm:inline">Raise Funds for a New Project</span>
            <span className="sm:hidden">Create Project</span>
          </button>
        ) : (
          <div></div>
        )}
        <div className="w-full sm:w-auto">
          <ConnectButton
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
