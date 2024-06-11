import React, { useEffect, useState } from "react";
import { navigationOptions } from "./NavigationMenu";
import logo from "../../assets/converseSphere.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Avatar, Button } from "@mui/material";
import profile from "../../assets/profile.svg";
import newTweet from "../../assets/newTweet.svg";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useDispatch, useSelector } from "react-redux";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import IconButton from "@mui/material/IconButton";
import { logoutUser, getUserProfile } from "../../Store/Auth/Action";

function Navigation({authData}) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("AuthToken");

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getUserProfile(jwt));
  }, []);

  return (
    <>
      <div className="h-[80vh] sticky top-0 hideScrollBar overflow-y-scroll overflow-x-hidden">
        <div>
          <div className="py-3 cursor-pointer">
            <img src={logo} onClick={() => navigate("/")} />
          </div>
          <div>
            {navigationOptions.map((item, index) => (
              <div
                className={`cursor-pointer flex space-x-3 items-center hover:bg-slate-200 h-10 rounded-md`}
                key={item?.title}
                onClick={() => {
                  item?.title === "PROFILE"
                    ? navigate(`/profile/${authData?.user?.id}`)
                    : navigate(item?.path);
                  setSelected(index);
                }}
              >
                <span className={`ml-2 font-lato ${
                  selected === index ? `text-blue-600` : ``
                }`}>{item?.icon}</span>
                <p className={`text-l items-center ${
                  selected === index ? `text-blue-600` : ``
                }`}>{t(item?.title)}</p>
              </div>
            ))}
            <div className="pt-4 pb-4 ml-2">
              <button class="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50  overflow-hidden h-10 w-[80%] rounded-[25px] bg-sky-200 p-2 flex justify-center items-center font-extrabold">
                <div class="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900"></div>
                <div class="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
                <div class="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
                <div class="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-600"></div>
                <p className="block z-10">
                  <EditRoundedIcon />
                </p>
                <p class="hidden lg:block z-10 ml-3">Tweet</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="block md:flex items-center justify-between fixed bottom-0 p-2">
        <div className="flex items-center space-x-3">
          <Avatar alt={profile} />
          <div>
            <span>
              {authData?.user?.fullName}
              <br />
              <span className="opacity-70">
                @{authData?.user?.fullName?.split(" ").join("_").toLowerCase()}
              </span>
            </span>
          </div>
          <IconButton
            className="ml-[35px] text-black font-black cursor-pointer"
            size="large"
            onClick={() => handleLogout}
          >
            <LogoutRoundedIcon onClick={handleLogout} />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default Navigation;
