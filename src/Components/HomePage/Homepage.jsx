import { Grid } from "@mui/material";
import React from "react";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import TrendingNews from "../Trending/TrendingNews";

function Homepage() {
  return (
    <Grid container className="sm:px-5 lg:px-15 space-between">
      <Grid item xs={3} lg={2.5} className="hidden lg:block w-full relative">
        <Navigation />
      </Grid>
      <Grid item xs={7} lg={6} className="px-5 lg:px-9 hidden lg:block w-full relative">
        <HomeSection />
      </Grid>
      <Grid item xs={2} lg={3} className="hidden lg:block w-full relative">
            <TrendingNews />
      </Grid>
    </Grid>
  );
}

export default Homepage;
