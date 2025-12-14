import { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectWallet } from "./components/ConnectWallet";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const Account = useAccount();
  const navigate = useNavigate();

  return (
    <div className="py-5 bg-slate-950 flex flex-row justify-between align-middle flex-wrap px-4">
      <div className="flex flex-row gap-6">
        <Link to={"/"} className="flex items-center">
          <img src="/Benelogo.svg" alt="" className="w-8 h-8 flex items mt-[1px]"/>
          <span className=" text-2xl px-1  font-bold text-white">Bene</span>
        </Link>
        <div className="w-80 hidden md:block">
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
        className="text-white text-2xl xl:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖️" : "☰"}
      </button>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } xl:flex flex flex-col xl:flex-row xl:justify-items-center w-full xl:w-auto gap-4 mt-4 xl:mt-0`}
      >
        {/* <button
          // onClick={() => scrollToSection("skills")}
          className="text-white text-lg sm:text-xl hover:bg-purple-800 px-5 rounded-sm shadow-md "
        >
          Skills
        </button> */}

        {Account.address ? (
          <button
            onClick={() => {
              if (Account.address) navigate("/create");
            }}
            className="text-white bg-zinc-800 font-bold text-sm h-10 hover:bg-zinc-900 px-3 rounded-lg shadow-md "
          >
            Raise Funds for a New Project
          </button>
        ) : (
          <div></div>
        )}
        <div>
          <ConnectWallet
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
