import { Grid } from "@mui/material";
import React from "react";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import TrendingNews from "../Trending/TrendingNews";
import Profile from "../Profile/Profile";
import { Routes, Route } from "react-router-dom";
import TweetDetails from "../TweetDetails/TweetDetails";

function Homepage() {
  return (
    <Grid container id="main" className="sm:px-5 lg:px-15 space-between">
      <Grid item xs={3} lg={2.5} className="hidden lg:block w-full relative">
        <Navigation />
      </Grid>
      <Grid
        item
        xs={7}
        lg={6}
        className="px-5 lg:px-9 hidden lg:block w-full relative"
      >
        <Routes>
          <Route path="/" element={<HomeSection />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/tweet/:id" element={<TweetDetails />} />
        </Routes>
      </Grid>
      <Grid item xs={2} lg={3} className="hidden lg:block w-full relative">
        <TrendingNews />
      </Grid>
    </Grid>
  );
}

export default Homepage;
