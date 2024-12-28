import { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const Account = useAccount();
  const navigate = useNavigate();

  return (
    <div className="py-5 bg-slate-950 flex flex-row justify-between align-middle flex-wrap px-4">
      <div className="flex flex-row gap-6">
        <Link to={"/"} className="flex">
          <svg
            fill="#ffffff"
            height="40px"
            viewBox="-102.4 -102.4 1228.80 1228.80"
            className="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="14137"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0">
              <rect
                x="-102.4"
                y="-102.4"
                width="1228.80"
                height="1228.80"
                rx="184.32"
                fill="#020617"
                strokeWidth="0"
              ></rect>
            </g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <defs>
                <style type="text/css"></style>
              </defs>
              <path
                d="M312.1 591.5c3.1 3.1 8.2 3.1 11.3 0l101.8-101.8 86.1 86.2c3.1 3.1 8.2 3.1 11.3 0l226.3-226.5c3.1-3.1 3.1-8.2 0-11.3l-36.8-36.8c-3.1-3.1-8.2-3.1-11.3 0L517 485.3l-86.1-86.2c-3.1-3.1-8.2-3.1-11.3 0L275.3 543.4c-3.1 3.1-3.1 8.2 0 11.3l36.8 36.8z"
                p-id="14138"
              ></path>
              <path
                d="M904 160H548V96c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H120c-17.7 0-32 14.3-32 32v520c0 17.7 14.3 32 32 32h356.4v32L311.6 884.1c-3.7 2.4-4.7 7.3-2.3 11l30.3 47.2v0.1c2.4 3.7 7.4 4.7 11.1 2.3L512 838.9l161.3 105.8c3.7 2.4 8.7 1.4 11.1-2.3v-0.1l30.3-47.2c2.4-3.7 1.3-8.6-2.3-11L548 776.3V744h356c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 512H160V232h704v440z"
                p-id="14139"
              ></path>
            </g>
          </svg>
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
