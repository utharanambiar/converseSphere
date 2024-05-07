import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useLocation, useNavigate } from "react-router-dom";
import TweetCard from "../HomeSection/TweetCard";
import { Divider } from "@mui/material";

function TweetDetails() {
  const navigate = useNavigate();
  const location = useLocation()

  const handleBack = () => {
    navigate(-1);
    console.log(location?.state)
  };
  return (
    <React.Fragment>
      <section className={`z-50 flex items-center sticky top-0 bg-opacity-95 bg-white`}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Tweet</h1>
      </section>
      <section>
        <TweetCard />
        <Divider sx={{margin: "2rem 0rem"}}/>
      </section>
      <section>
        {[1, 1, 1].map((item) => (
          <TweetCard />
        ))}
      </section>
    </React.Fragment>
  );
}

export default TweetDetails;
