import React from "react";
import { Grid } from "@mui/material";
import img from "../../assets/converseSphere.svg";
import { GoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material";
import AuthModal from "../Modals/AuthModal";
import { Navigate } from "react-router-dom";

function Authentication() {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const handleOpen = () => setOpenAuthModal(true);
  const handleClose = () => setOpenAuthModal(false);

  return (
    <div>
      <Grid
        className="h-screen lg:overflow-y-hidden flex justify-around bg-[#62cff4] xl:bg-[#2c67f2]"
        container
      >
        <Grid
          className="grid w-screen bg-gradient-to-r from-[#62cff4] to-[#2c67f2] place-items-center"
          item
          lg={7}
        >
          <img
            className="h-[30vh] lg:w-full lg:h-screen mix-blend-multiply"
            src={img}
            alt="auth image"
          />
        </Grid>
        <Grid
          className="lg:pl-[4rem] rounded-tl-[100px] bg-white shadow-3xl flex flex-col flex-wrap items-center justify-around"
          lg={5}
          xs={12}
          item
        >
          <div className="pl-[2rem] md:pl-[0rem]">
            <h1 className="font-bold text-7xl mt-10 font-lato">What's up?</h1>
            <h1 className="font-bold text-3xl py-12 lg:pt-12 lg:pb-8 font-lato">
              Join us now!
            </h1>
          </div>
          <div className="flex flex-col flex-wrap justify-around items-center">
            <div className="w-[80%] md:w-full flex flex-col items-center flex-wrap lg:pr-[20px]">
              <GoogleLogin width={330} />
              <p className="py-5 text-center">OR</p>
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ borderRadius: "30px", py: "7px" }}
                onClick={handleOpen}
              >
                Create account
              </Button>
              <p className="text-sm mt-2 font-lato">
                By signing up, you agree to the Terms of Service and Privacy
                Policy, including cookie use.
              </p>
              <h1 className="font-bold text-xl mb-5 font-lato mt-[40px] text-center">
                Already have an account?
              </h1>
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ borderRadius: "30px", py: "7px", marginBottom: "20px" }}
              >
                Login
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <AuthModal open={openAuthModal} handleClose={handleClose} />
    </div>
  );
}

export default Authentication;
