import { Grid } from "@mui/material";
import React from "react";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import TrendingNews from "../Trending/TrendingNews";
import Profile from "../Profile/Profile";
import { Routes, Route } from "react-router-dom";
import TweetDetails from "../TweetDetails/TweetDetails";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import More from "../MoreSection/More";
import PageNotFound from "../Error/PageNotFound";
import { useDispatch, useSelector } from "react-redux";

function Homepage() {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const { auth } = useSelector((store) => store);


  console.log("auth in homepage to check why not loading:", auth)

  return (
    <div
      className={`${
        showSidebar &&
        "bg-gray-300 lg:bg-transparent z-100 backdrop:filter backdrop-blur-lg"
      } flex w-screen lg:w-[95vw] lg:mr-5 inset-y-0 left-0 h-screen`}
    >
      <div
        className={`${
          showSidebar
            ? "w-4/5 bg-white left-0 z-10"
            : "translate-x-[-100%] md:translate-x-0 w-[20vw] overflow-hidden"
        } duration-300 h-screen  lg:w-[25vw] dark:bg-[#353941]`}
        onClick={() => setShowSidebar(false)}
      >
        <Navigation authData={auth}/>
      </div>
      <div
        className={`lg:w-[70vw] md:ml-0 md:mr-0 absolute h-screen md:relative  overflow-x-auto hideScrollBar ${
          showSidebar && "opacity-60 md:opacity-100"
        }`}
      >
        <div className="cursor-pointer sticky top-0 pt-3 pl-2 bg-white lg:hidden lg:invisible dark:bg-[#353941] h-[45px]">
          <MenuRoundedIcon onClick={() => setShowSidebar(true)} fontSize="medium"/>
          <span className="-translate-y-2 text-xl font-bold opacity-90 ml-3">
          ConverseSphere
        </span>
        <span className="absolute top-0 right-0 pl-3">
          <form class="form relative">
            <button class="absolute left-2 -translate-y-1/2 top-1/2 p-1">
              <svg
                width="13"
                height="13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="search"
                class="w-5 h-5 text-gray-700"
              >
                <path
                  d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                  stroke="currentColor"
                  stroke-width="1.333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <input
              class="input rounded-full px-6 py-1 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
              placeholder="Search..."
              required=""
              type="text"
            />
            <button
              type="reset"
              class="absolute right-3 -translate-y-1/2 top-1/2 p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </form>
        </span>
        </div>
        <div onClick={() => setShowSidebar(false)} className="h-screen">
          <Routes>
            <Route path="/" element={<HomeSection />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/tweet/:id" element={<TweetDetails />} />
            <Route path="/more" element={<More />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
      <div className="hidden lg:block w-[20vw] h-screen overflow-x-auto hideScrollBar">
        <TrendingNews />
      </div>
    </div>
  );
}

export default Homepage;