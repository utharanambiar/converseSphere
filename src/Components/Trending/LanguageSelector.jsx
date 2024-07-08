import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const languages = [
    { label: "English", code: "en" },
    { label: "French", code: "fr" },
  ];
  const [value, setValue] = React.useState(
    localStorage.getItem("lang") !== undefined
      ? JSON.parse(localStorage.getItem("lang"))
      : languages[0]
  );

  const { i18n } = useTranslation();

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={languages}
      sx={{ width: 200, height: 2 }}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        localStorage.setItem("lang", JSON.stringify(newValue));
        i18n.changeLanguage(newValue?.code);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Language" size="small" />
      )}
    />
  );
}

export default LanguageSelector;
