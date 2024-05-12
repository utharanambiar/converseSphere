import React from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Button } from "@mui/material";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";
import LanguageSelector from "../Trending/LanguageSelector";

function More() {
  const [theme, setTheme] = React.useState(false);
  const handleTheme = () => {
    setTheme(!theme);
    console.log("changed theme", theme);
  };
  return (
    <>
      <div className="flex justify-center items-center py-3">
        <p>Change theme: </p>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onClick={handleTheme}
          />
          <div className="group peer ring-0 bg-[#73C0FC]  rounded-full outline-none duration-300 after:duration-300 w-16 h-8  shadow-md peer-checked:bg-[#183153]  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95">
            <img
              src={sun}
              className="absolute top-1 left-8 stroke-gray-900 w-8 h-6 animate-rotate"
            />
            <img
              src={moon}
              className="absolute top-1 left-0 stroke-gray-900 w-8 h-6 animate-tilt"
            />
          </div>
        </label>
      </div>
      <div className="flex justify-center items-center py-3">
        <p>Change language:</p>
        <LanguageSelector/>
      </div>
    </>
  );
}

export default More;
