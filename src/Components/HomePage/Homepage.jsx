import { Grid } from "@mui/material";
import React from "react";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import TrendingNews from "../Trending/TrendingNews";
import Profile from "../Profile/Profile";
import { Routes, Route } from "react-router-dom";
import TweetDetails from "../TweetDetails/TweetDetails";
import MenuIcon from "@mui/icons-material/Menu";
import More from "../MoreSection/More";
import PageNotFound from "../Error/PageNotFound";

function Homepage() {
  const [showSidebar, setShowSidebar] = React.useState(true);

  const handleClick = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <div className="flex w-[95vw] lg:ml-5 lg:mr-5">
      <div
        className={`${
          showSidebar
            ? "w-[10%] lg:w-[25vw]"
            : "translate-x-[-100%] w-0 overflow-hidden"
        } duration-300`}
      >
        <Navigation />
      </div>
      <div className="w-[60vw] lg:w-[70vw] grow ml-5 md:ml-5 mr-5">
        <div className="cursor-pointer sticky top-0 bg-slate-200 w-fit">
          <MenuIcon onClick={handleClick} />
        </div>
        <Routes>
          <Route path="/" element={<HomeSection />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/tweet/:id" element={<TweetDetails />} />
          <Route path="/more" element={<More />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <div className="hidden lg:block w-[20vw]">
        <TrendingNews />
      </div>
    </div>
  );
}

export default Homepage;
