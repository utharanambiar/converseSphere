import React, { useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TweetCard from "../HomeSection/TweetCard";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { findTweetsById, getAllTweets } from "../../Store/Tweet/Action";

function TweetDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { tweet } = useSelector((store) => store);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (id) {
      dispatch(findTweetsById(id));
    }
  }, [id]);


  return (
    <React.Fragment>
      <section
        className={`z-50 flex items-center sticky top-0 bg-opacity-95 bg-white`}
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Tweet</h1>
      </section>
      <section>
        <TweetCard tweetData={tweet?.tweet} displayComments={false} />
        <Divider sx={{ margin: "2rem 0rem" }} />
      </section>
      <section>
        {tweet?.tweet?.replyTweets.map((item) => (
          <TweetCard tweetData={item} displayComments={false} />
        ))}
      </section>
    </React.Fragment>
  );
}

export default TweetDetails;
