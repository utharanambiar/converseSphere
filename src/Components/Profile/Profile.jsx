import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import profile from "../../assets/profile.svg";
import verified from "../../assets/verified.svg";
import { Button } from "@mui/material";
import { BusinessCenterSharp } from "@mui/icons-material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function Profile() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleOpenProfileModal = () => {
    console.log("profile modal opened");
  };

  const handleFollowUser = () => {
    console.log("follow user");
  };
  return (
    <div>
      <section className={`z-50 flex items-center sticky top-0 bg-opacity-95`}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
          Uthara Nambiar
        </h1>
      </section>
      <section>
        <img
          className="w-[100%] h-[15rem] object-cover"
          src="https://cdn.pixabay.com/photo/2019/03/03/20/23/background-4032775_1280.png"
          alt="image"
        />
      </section>
      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            alt="username"
            src={profile}
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />
          {true ? (
            <Button
              className="rounded-full"
              variant="contained"
              sx={{ borderRadius: "20px" }}
              onClick={handleOpenProfileModal}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              className="rounded-full"
              variant="contained"
              sx={{ borderRadius: "20px" }}
              onClick={handleFollowUser}
            >
              {true ? "Follow" : "Unfollow"}
            </Button>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-lg">Uthara Nambiar</h1>
            {true && <img className="ml-2 w-5 h-5" src={verified} />}
          </div>
          <h1 className="text-gray-500">@utharanambiar</h1>
        </div>
        <div className="mt-2 space-y-3">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <div className="py-1 flex space-x-5">
            <div className="flex items-center text-gray-500">
              <BusinessCenterSharp />
              <p className="ml-2">Education</p>
            </div>
            <div className="flex items-center text-gray-500">
              <LocationOnIcon />
              <p className="ml-2">India</p>
            </div>
            <div className="flex items-center text-gray-500">
              <CalendarMonthIcon />
              <p className="ml-2">Joined May 2024</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
