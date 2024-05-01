import { Grid } from "@mui/material";
import React from "react";
import Navigation from "../Navigation/Navigation";

function Homepage() {
  return (
    <Grid container className="sm:px-5 lg:px-15 space-between">
      <Grid item xs={3} lg={2.5} className="hidden lg:block w-full relative">
        <Navigation/>
      </Grid>
      <Grid item xs={7} lg={6} className="hidden lg:block w-full relative">
        <p className="text-center">Middle</p>
      </Grid>
      <Grid item xs={2} lg={3} className="hidden lg:block w-full relative">
        <p className='text-center'>Right</p>
      </Grid>
    </Grid>
  );
}

export default Homepage;
