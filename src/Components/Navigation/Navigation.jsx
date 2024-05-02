import React from "react";
import { navigationOptions } from "./NavigationMenu";
import logo from "../../assets/converseSphere.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Avatar, Button } from "@mui/material";
import profile from "../../assets/profile.svg";

function Navigation() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  return (
    <div className="h-screen sticky top-0">
      <div>
        <div className="py-3 cursor-pointer">
          <img src={logo} onClick={() => navigate("/home")} />
        </div>
        <div className="space-y-6">
          {navigationOptions.map((item) => (
            <div
              className="cursor-pointer flex space-x-3 items-center"
              key={item?.title}
              onClick={() =>
                item?.title === "PROFILE"
                  ? navigate(`/profile/${5}`)
                  : navigate(item?.path)
              }
            >
              {item?.icon}
              <p className="text-l">{t(item?.title)}</p>
            </div>
          ))}
        </div>
        <div className="pt-6 pb-4">
          <Button
            sx={{
              width: "80%",
              borderRadius: "25px",
              py: "15px",
              bgcolor: "#1e88e5",
              height: "40px",
            }}
            variant="contained"
          >
            Tweet
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar alt={profile} />
          <div>
            <span>
              Uthara Nambiar
              <br/>
              <span className="opacity-70">@utharanambiar</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
