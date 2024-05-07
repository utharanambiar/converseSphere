import React, { useState } from "react";
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

function TweetCard() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [like, setLike] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    console.log("deleted");
    handleClose();
  };

  const handleOpenReplyModal = () => {
    console.log("open chat reply");
  };

  const handleRetweet = () => {
    console.log("handleRetweet");
  };

  const handleLike = (value) => {
    console.log(value);
    setLike(!value);
  };
  return (
    <>
      {!loading && (
        <div>
          <div className="flex space-x-5">
            <Avatar
              className="cursor-pointer"
              src={profile}
              alt="username"
              onClick={() => navigate(`/profile/${6}`)}
            />
            <div className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex cursor-pointer items-center space-x-2">
                  <span
                    className="font-semibold"
                    onClick={() => navigate(`/profile/${6}`)}
                  >
                    Uthara Nambiar
                  </span>
                  <span className="text-gray-600">.</span>
                  <span
                    className="text-gray-600"
                    onClick={() => navigate(`/profile/${6}`)}
                  >
                    @utharanambiar
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
                    <MenuItem onClick={handleDelete}>
                      {t("DELETE_TWEET")}
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                      {t("EDIT_TWEET")}
                    </MenuItem>
                  </Menu>
                </div>
              </div>
              <div className="mt-2">
                <div className="cursor-pointer">
                  <p className="mb-2 p-0">
                    Twitter clone project for resume. Spring + react + sql{" "}
                  </p>
                  <img
                    className="w-[28rem] border border-gray-400 p-5 rounded-md"
                    src={verified}
                  />
                </div>
                <div className="py-5 flex flex-wrap justify-between items-center">
                  <div className="space-x-3 flex items-center text-gray-600">
                    <ChatBubbleOutlineIcon
                      className="cursor-pointer"
                      onClick={() => handleOpenReplyModal}
                    />
                    <p>57</p>
                  </div>
                  <div
                    className={`${
                      true ? "text-pink-600" : "text-gray-600"
                    } space-x-0 flex items-center`}
                  >
                    <RepeatIcon
                      onClick={() => handleRetweet}
                      className="cursor-pointer"
                    />
                    <p>43</p>
                  </div>
                  <div
                    className={`${
                      like ? "text-pink-600" : "text-gray-600"
                    } space-x-0 flex items-center`}
                  >
                    {/* <FavoriteIcon onClick={()=>handleRetweet} className="cursor-pointer"/> */}
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
                    <p>43</p>
                  </div>
                  <div className="space-x-3 flex items-center text-gray-600">
                    <BarChartIcon
                      className="cursor-pointer"
                      onClick={() => handleOpenReplyModal}
                    />
                    <p>2787</p>
                  </div>
                  <div className="space-x-3 flex items-center text-gray-600">
                    <UploadIcon
                      className="cursor-pointer"
                      onClick={() => handleOpenReplyModal}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div class="relative flex w-full animate-pulse gap-2 mb-5">
          <div class="h-12 w-12 rounded-full bg-neutral-400/50"></div>
          <div class="flex-1 mt-2">
            <div className="flex">
              <div class="mb-1 h-3 w-2/5 rounded-lg bg-neutral-400/50 text-lg mr-5"></div>
              <div class="h-3 w-[30%] rounded-lg bg-neutral-400/50 text-sm"></div>
            </div>
            <div class="flex flex-col gap-2 mt-3">
            <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
            <div class="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
            <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
            <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
            <div class="bg-neutral-400/50 w-full h-64 animate-pulse rounded-md"></div>
          </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TweetCard;
