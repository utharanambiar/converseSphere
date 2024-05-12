import React from "react";
import LanguageSelector from "./LanguageSelector";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Button } from "@mui/material";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";
import GetVerified from "../Modals/GetVerifiedModal";

function TrendingNews() {
  const [theme, setTheme] = React.useState(false);
  const [openVerifiedModal, setOpenVerifiedModal] = React.useState(false);
  const handleOpenVerifiedModal = () => setOpenVerifiedModal(true);
  const handleCloseVerifiedModal = () => setOpenVerifiedModal(false);
  const handleTheme = () => {
    setTheme(!theme);
    console.log("changed theme", theme);
  };
  return (
    <>
      <div className="py-5 sticky top">
        <div className="relative flex items-center">
          <input
            type="text"
            className="py-3 rounded-full text-gray-500 w-full pl-12"
            placeholder="Search"
          />
          <div className="absolute top-0 left-0 pl-3 pt-3">
            <SearchIcon className="text-gray-500" />
          </div>
          {/* <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onClick={handleTheme}
            />
            <div className="group peer ring-0 bg-[#73C0FC]  rounded-full outline-none duration-300 after:duration-300 w-16 h-8  shadow-md peer-checked:bg-[#183153]  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95">
              <img
                src={sun}
                className="absolute top-1 left-8 stroke-gray-900 w-8 h-6 animate-rotate"
              />
              <img
                src={moon}
                className="absolute top-1 left-0 stroke-gray-900 w-8 h-6 animate-tilt"
              />
            </div>
          </label> */}
        </div>
        <section className="my-5">
          <h1 className="text-xl font-bold">Get Verified</h1>
          <h1 className="font-bold my-2">Subscribe to unlock new features</h1>
          <button class="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50  overflow-hidden h-10 w-[80%] rounded-[25px] bg-sky-200 p-2 flex justify-center items-center font-extrabold">
            <div class="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900"></div>
            <div class="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
            <div class="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
            <div class="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-600"></div>
            <p class="z-10" onClick={handleOpenVerifiedModal}>
              Get Verified
            </p>
          </button>
        </section>
        <section className="mt-7 space-y-5">
          <h1 className="font-bold text-xl py-1">What's trending?</h1>
          <div>
            <p className="text-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
              veritatis ipsa aut, sint aperiam eaque dolore rem corrupti id
              porro consectetur repellat animi temporibus culpa nemo vel
              laboriosam, ex molestias.
            </p>
            <p className="font-bold">Trending news</p>
          </div>
          <div className="flex justify-between w-full">
            <div>
              <p>Entertainment</p>
              <p className="font-bold">#KungFuPanda4</p>
              <p className="text-gray-400">30k - Number of tweets</p>
            </div>
            <MoreHoriz />
          </div>
        </section>
      </div>
      <GetVerified
        open={openVerifiedModal}
        handleClose={handleCloseVerifiedModal}
      />
    </>
  );
}

export default TrendingNews;
