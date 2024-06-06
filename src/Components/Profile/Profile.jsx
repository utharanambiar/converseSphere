import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import profile from "../../assets/profile.svg";
import verified from "../../assets/verified.svg";
import { Button } from "@mui/material";
import { BusinessCenterSharp } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box } from "@mui/material";
import TweetCard from "../HomeSection/TweetCard";
import ProfileModal from "../Modals/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { findTweetsById } from "../../Store/Tweet/Action";

function Profile() {
  const [value, setValue] = React.useState("1");
  const [openProfileModal, setOpenProfileModal] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { tweet } = useSelector((store) => store);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue == 4) {
      console.log("likes");
    } else if (newValue == 1) {
      console.log("users tweet");
    }
  };

  const handleClose = () => {
    setOpenProfileModal(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleOpenProfileModal = () => {
    setOpenProfileModal(true);
    console.log("profile modal opened", openProfileModal);
  };

  const handleFollowUser = () => {
    console.log("follow user");
  };

  React.useEffect(() => {
    if (id) {
      dispatch(findTweetsById(id));
    }
  }, [id]);

  console.log("tweet data here:", tweet)

  return (
    <div>
      <section
        className={`z-50 flex items-center sticky top-0 bg-opacity-95 bg-white`}
      >
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
          <div className="flex items-start space-x-5">
            <div className="flex items-center space-x-1 font-semibold">
              <span>30</span>
              <span className="text-gray-500">Following</span>
            </div>
            <div className="flex items-center space-x-1 font-semibold">
              <span>670</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Tweets" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Media" value="3" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ p: 1 }}>
              {tweet?.tweets?.map((item) => (
                <TweetCard tweetData={item} displayComments={false} />
              ))}
            </TabPanel>
            <TabPanel value="2" sx={{ p: 1 }}>
              {tweet?.tweet?.replyTweets?.map((item) => (
                <TweetCard tweetData={item} displayComments={false} />
              ))}
            </TabPanel>
            <TabPanel value="3">Media</TabPanel>
            <TabPanel value="4" sx={{ p: 1.5 }}>{tweet?.tweet?.replyTweets?.map((item) => (
                <TweetCard tweetData={item} displayComments={false} />
              ))}</TabPanel>
          </TabContext>
        </Box>
      </section>
      <section>
        <ProfileModal open={openProfileModal} handleClose={handleClose} />
      </section>
    </div>
  );
}

export default Profile;
