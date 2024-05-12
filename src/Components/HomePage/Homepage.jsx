import { Grid } from "@mui/material";
import React from "react";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import TrendingNews from "../Trending/TrendingNews";
import Profile from "../Profile/Profile";
import { Routes, Route } from "react-router-dom";
import TweetDetails from "../TweetDetails/TweetDetails";
import MenuIcon from "@mui/icons-material/Menu";

function Homepage() {
  const [showSidebar, setShowSidebar] = React.useState(true);

  const handleClick = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <Grid container id="main" className="sm:px-5 lg:px-15 space-between">
      <Grid item xs={3} lg={2.5} className={`lg:block w-full relative ${showSidebar ? "" : "hidden"}`}>
        <Navigation />
      </Grid>
      <div className="cursor-pointer">
          <MenuIcon onClick={handleClick} />
        </div>
      <Grid
        item
        xs={`${showSidebar ? 6 : 9}`}
        lg={7}
        className="px-5 lg:px-9 lg:block w-full relative"
      >
        <Routes>
          <Route path="/" element={<HomeSection />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/tweet/:id" element={<TweetDetails />} />
        </Routes>
      </Grid>
      <Grid item xs={2} lg={3} className="lg:block w-full relative">
        <TrendingNews />
      </Grid>
    </Grid>
  );
}

export default Homepage;
