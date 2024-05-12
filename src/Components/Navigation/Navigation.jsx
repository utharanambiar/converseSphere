import React, { useState } from "react";
import { navigationOptions } from "./NavigationMenu";
import logo from "../../assets/converseSphere.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Avatar, Button } from "@mui/material";
import profile from "../../assets/profile.svg";

function Navigation() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(-1);

  const navigate = useNavigate();
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
                className={`cursor-pointer flex space-x-3 items-center hover:bg-slate-200 h-10 rounded-md ${
                  selected === index ? `bg-slate-200` : ``
                }`}
                key={item?.title}
                onClick={() => {
                  item?.title === "PROFILE"
                    ? navigate(`/profile/${5}`)
                    : navigate(item?.path);
                  setSelected(index);
                  console.log(selected);
                }}
              >
                <span className="ml-2">{item?.icon}</span>
                <p className="text-l items-center">{t(item?.title)}</p>
              </div>
            ))}
            <div className="pt-4 pb-4">
              <button class="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50  overflow-hidden h-10 w-[80%] rounded-[25px] bg-sky-200 p-2 flex justify-center items-center font-extrabold">
                <div class="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900"></div>
                <div class="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
                <div class="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
                <div class="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-600"></div>
                <p class="z-10">Tweet</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between fixed bottom-0">
        <div className="flex items-center space-x-3">
          <Avatar alt={profile} />
          <div>
            <span>
              Uthara Nambiar
              <br />
              <span className="opacity-70">@utharanambiar</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
