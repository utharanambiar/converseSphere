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
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {
  findTweetsById,
  getUsersTweet,
  getRepliesByUser,
} from "../../Store/Tweet/Action";
import { findUserById, followUser } from "../../Store/Auth/Action";

function Profile({setShowSidebar}) {
  const [value, setValue] = React.useState("1");
  const [openProfileModal, setOpenProfileModal] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { tweet } = useSelector((store) => store);
  const { auth } = useSelector((store) => store);

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
  };

  const handleFollowUser = () => {
    dispatch(followUser(id));
    console.log("follow user");
  };

  React.useEffect(() => {
    if (id) {
      dispatch(findUserById(id));
      dispatch(getUsersTweet(id));
      dispatch(getRepliesByUser(id));
    }
  }, [id]);

  console.log(tweet);

  return (
    <div>
      <section
        className={`z-50 flex items-center sticky top-0 bg-opacity-95 bg-white dark:bg-[#353941]`}
      >
        {/* <div className="cursor-pointer sticky top-0 w-full bg-white lg:hidden lg:invisible dark:bg-[#353941]">
          <MenuRoundedIcon onClick={() => setShowSidebar(true)} fontSize="medium"/>
        </div> */}
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
          {auth?.findUser?.fullName}
        </h1>
      </section>
      <div className="ml-2 mr-2 md:ml-5 md:mr-5">
        <section>
          <img
            className="w-[100%] h-[15rem] object-cover"
            src={
              auth?.findUser?.bannerImage ||
              "https://cdn.pixabay.com/photo/2019/03/03/20/23/background-4032775_1280.png"
            }
            alt="image"
          />
        </section>
        <section className="pl-6">
          <div className="flex justify-between items-start mt-5 h-[5rem]">
            <Avatar
              className="transform -translate-y-24"
              alt="username"
              src={auth?.findUser?.profileImage || profile}
              sx={{
                width: "10rem",
                height: "10rem",
                border: "4px solid white",
              }}
            />
            {auth?.findUser?.isReqUser ? (
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
                {auth?.findUser?.followed ? "Unfollow" : "Follow"}
              </Button>
            )}
          </div>
          <div>
            <div className="flex items-center">
              <h1 className="font-bold text-lg">{auth?.findUser?.fullName}</h1>
              {true && <img className="ml-2 w-5 h-5" src={verified} />}
            </div>
            <h1 className="text-gray-500">
              {auth?.findUser?.username ||
                `@${auth?.findUser?.fullName
                  ?.split(" ")
                  .join("_")
                  .toLowerCase()}`}
            </h1>
          </div>
          <div className="mt-2 space-y-3">
            <p>{auth?.findUser?.bio}</p>
            <div className="py-1 flex space-x-5">
              <div className="flex items-center text-gray-500">
                <BusinessCenterSharp />
                <p className="ml-2">{auth?.findUser?.website || "Website"}</p>
              </div>
              <div className="flex items-center text-gray-500">
                <LocationOnIcon />
                <p className="ml-2">{auth?.findUser?.location || "Location"}</p>
              </div>
              <div className="flex items-center text-gray-500">
                <CalendarMonthIcon />
                <p className="ml-2">Joined May 2024</p>
              </div>
            </div>
            <div className="flex items-start space-x-5">
              <div className="flex items-center space-x-1 font-semibold">
                <span>{auth?.findUser?.following.length}</span>
                <span className="text-gray-500">Following</span>
              </div>
              <div className="flex items-center space-x-1 font-semibold">
                <span>{auth?.findUser?.followers.length}</span>
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
                  <Tab label="Likes" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ p: 1 }}>
                {tweet?.tweets
                  ?.sort((a, b) => {
                    return a?.id - b?.id;
                  })
                  ?.map((item) => (
                    <TweetCard tweetData={item} displayComments={false} />
                  ))}
              </TabPanel>
              <TabPanel value="2" sx={{ p: 1 }}>
                {tweet?.replyTweets
                  ? tweet?.replyTweets
                      ?.sort((a, b) => {
                        return b?.id - a?.id;
                      })
                      ?.map((item) => (
                        <TweetCard tweetData={item} displayComments={false} />
                      ))
                  : "No replies yet"}
              </TabPanel>
              {/* <TabPanel value="3">Media</TabPanel> */}
              <TabPanel value="4" sx={{ p: 1.5 }}>
                {tweet?.tweet?.replyTweets?.map((item) => (
                  <TweetCard tweetData={item} displayComments={false} />
                ))}
              </TabPanel>
            </TabContext>
          </Box>
        </section>
        <section>
          <ProfileModal open={openProfileModal} handleClose={handleClose} />
        </section>
      </div>
    </div>
  );
}

export default Profile;
