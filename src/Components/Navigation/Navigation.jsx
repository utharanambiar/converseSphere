import React from "react";
import { navigationOptions } from "./NavigationMenu";
import logo from "../../assets/converseSphere.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

function Navigation() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  return (
    <div className="h-screen sticky top-0">
      <div>
        <div className="py-5 cursor-pointer">
          <img src={logo} onClick={() => navigate("/home")} />
        </div>
        <div className="space-y-6">
          {navigationOptions.map((item) => (
            <div
              className="cursor-pointer flex space-x-3 items-center"
              key={item?.title}
              onClick={() => navigate(item?.path)}
            >
              {item?.icon}
              <p className="text-xl">{t(item?.title)}</p>
            </div>
          ))}
        </div>
        <LanguageSelector/>
      </div>
    </div>
  );
}

export default Navigation;
