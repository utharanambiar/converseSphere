import React, { useEffect, useState } from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Avatar } from "@mui/material";
import profile from "../../assets/profile.svg";
import { useNavigate } from "react-router-dom";
import verified from "../../assets/verified.svg";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useTranslation } from "react-i18next";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import UploadIcon from "@mui/icons-material/Upload";
import BarChartIcon from "@mui/icons-material/BarChart";
import Modal from "@mui/material/Modal";
import ReplyModal from "../Modals/ReplyModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createReTweet,
  likeTweet,
  getAllTweets,
  deleteTweet,
} from "../../Store/Tweet/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TweetCard = ({ tweetData, displayComments }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [like, setLike] = React.useState(tweetData?.liked || false);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [reply, setReply] = useState(false);
  const { tweet } = useSelector((store) => store);
  const [openReplyModal, setOpenReplyModal] = React.useState(false);
  const handleOpenReplyModal = () => setOpenReplyModal(true);
  const handleCloseReplyModal = () => setOpenReplyModal(false);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let date1 = new Date();

  const findTimeDifference = (date2) => {
    var difference = date1.getTime() - date2.getTime();

    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24;

    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60;

    var minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60;

    if (daysDifference != 0) {
      return `${daysDifference}d ago`;
    } else if (hoursDifference != 0) {
      return `${hoursDifference} ${hoursDifference == 1 ? "hr" : "hrs"} ago`;
    } else if (minutesDifference != 0) {
      return `${minutesDifference} ${
        minutesDifference == 1 ? "min" : "mins"
      } ago`;
    }
    return `<1 min ago`;
  };

  const handleModalClose = () => setOpen(false);

  const handleOpen = () => {
    handleClose();
    setModalOpen(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    console.log("deleted");
    dispatch(deleteTweet(tweetData?.id));
    setModalOpen(false);
    handleClose();
  };

  const handleRetweet = (tweetId) => {
    dispatch(createReTweet(tweetId));
    console.log("handleRetweet");
  };

  const handleLike = (value) => {
    console.log(value);
    dispatch(likeTweet(Number(tweetData?.id)));
    console.log(tweetData);
    setLike(!value);
  };

  // console.log("twet data in card: ", tweet)

  return (
    <React.Fragment>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div class="group select-none w-[250px] flex flex-col p-4 fixed z-[9999] items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl -translate-y-[50%] -translate-x-[50%] top-[50%] left-[50%]">
          <div class="">
            <div class="text-center p-3 flex-auto justify-center">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                class="group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  fill-rule="evenodd"
                ></path>
              </svg>
              <h2 class="text-xl font-bold py-4 text-gray-200">
                Are you sure?
              </h2>
              <p class="font-bold text-sm text-gray-500 px-2">
                Do you really want to continue ? This process cannot be undone
              </p>
            </div>
            <div class="p-2 mt-2 text-center space-x-1 md:block">
              <button
                class="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                class="bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
                onClick={handleDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Modal>
      {!loading && (
        <div>
          <div className="flex lg:space-x-5">
            <Avatar
              className="cursor-pointer"
              src={profile}
              alt="username"
              onClick={() => navigate(`/profile/${tweetData?.user?.id}`)}
            />
            <div className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex cursor-pointer items-center space-x-2">
                  <span
                    className="font-semibold hidden md:block"
                    onClick={() => navigate(`/profile/${tweetData?.user?.id}`)}
                  >
                    {tweetData?.user?.fullName || "Dummy account"}
                  </span>
                  <span className="text-gray-600 hidden md:block">.</span>
                  <span
                    className="text-gray-600"
                    onClick={() => navigate(`/profile/${tweetData?.user?.id}`)}
                  >
                    @
                    {tweetData?.user?.fullName
                      ?.split(" ")
                      .join("_")
                      .toLowerCase() || "Dummy account"}
                  </span>
                  <span className="text-gray-600">.</span>
                  <span className="text-gray-600">
                    {findTimeDifference(new Date(tweetData?.createdAt))}
                  </span>
                  <img className="ml-2 w-5 h-5" src={verified} />
                </div>
                <div>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <MoreHorizIcon />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleOpen}>
                      {t("DELETE_TWEET")}
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                      {t("EDIT_TWEET")}
                    </MenuItem>
                  </Menu>
                </div>
              </div>
              <div className="mt-2 mb-2">
                <div
                // onClick={() => !displayComments && navigate(`/tweet/${Number(tweet?.replyFor)}`)}
                // className="cursor-pointer"
                >
                  <p className="mb-2 p-0">{tweetData?.content}</p>
                  {tweetData?.img && (
                    <img
                      className="w-[28rem] border border-gray-400 p-5 rounded-md"
                      src={tweetData?.img}
                    />
                  )}
                </div>
                {displayComments && (
                  <div className="py-5 flex flex-wrap justify-between items-center">
                    <div className="space-x-3 flex items-center text-gray-600">
                      <ChatBubbleOutlineIcon
                        className="cursor-pointer"
                        onClick={handleOpenReplyModal}
                      />
                      <p>{tweetData?.totalReplies}</p>
                    </div>
                    <div
                      className={`${
                        tweetData?.totalRetweets
                          ? "text-pink-600"
                          : "text-gray-600"
                      } space-x-0 flex items-center`}
                    >
                      <RepeatIcon
                        onClick={() => handleRetweet(tweetData?.id)}
                        className="cursor-pointer"
                      />
                      <p>{tweetData?.totalRetweets}</p>
                    </div>
                    <div
                      className={`${
                        tweetData?.liked ? "text-pink-600" : "text-gray-600"
                      } space-x-0 flex items-center`}
                    >
                      {like ? (
                        <FavoriteIcon
                          className="cursor-pointer"
                          onClick={() => handleLike(true)}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          className="cursor-pointer"
                          onClick={() => handleLike(false)}
                        />
                      )}
                      <p>{tweetData?.totalLikes}</p>
                    </div>
                    <div className="space-x-3 flex items-center text-gray-600">
                      <BarChartIcon
                        className="cursor-pointer"
                        onClick={handleOpenReplyModal}
                      />
                      <p>2787</p>
                    </div>
                    <div className="space-x-3 flex items-center text-gray-600">
                      <UploadIcon
                        className="cursor-pointer"
                        onClick={handleOpenReplyModal}
                      />
                    </div>
                  </div>
                )}
                {tweetData?.totalReplies > 0 && displayComments && (
                  <div
                    onClick={() => navigate(`/tweet/${tweetData?.id}`)}
                    className="cursor-pointer text-gray-400"
                  >
                    {`View all ${tweetData?.totalReplies} replies`}
                  </div>
                )}
                <section>
                  <ReplyModal
                    item={tweetData}
                    openReplyModal={openReplyModal}
                    handleCloseReplyModal={handleCloseReplyModal}
                  />
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="relative flex w-full animate-pulse gap-2 mb-5">
          <div className="h-12 w-12 rounded-full bg-neutral-400/50"></div>
          <div className="flex-1 mt-2">
            <div className="flex">
              <div className="mb-1 h-3 w-2/5 rounded-lg bg-neutral-400/50 text-lg mr-5"></div>
              <div className="h-3 w-[30%] rounded-lg bg-neutral-400/50 text-sm"></div>
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
              <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
              <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
              <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
              <div className="bg-neutral-400/50 w-full h-64 animate-pulse rounded-md"></div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default TweetCard;
