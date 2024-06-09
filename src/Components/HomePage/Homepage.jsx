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
      } flex w-screen lg:w-[95vw] lg:ml-5 lg:mr-5 inset-y-0 left-0 h-screen`}
    >
      <div
        className={`${
          showSidebar
            ? "w-4/5 bg-white left-0 z-10"
            : "translate-x-[-100%] md:translate-x-0 w-[20vw] overflow-hidden"
        } duration-300 h-screen  lg:w-[25vw]`}
        onClick={() => setShowSidebar(false)}
      >
        <Navigation authData={auth}/>
      </div>
      <div
        className={`w-[90vw] lg:w-[70vw] ml-5 md:ml-5 mr-5 absolute h-screen md:relative  overflow-x-auto hideScrollBar ${
          showSidebar && "opacity-60 md:opacity-100"
        }`}
      >
        <div className="cursor-pointer sticky top-0 w-full bg-white lg:hidden lg:invisible">
          <MenuRoundedIcon onClick={() => setShowSidebar(true)} fontSize="medium"/>
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
