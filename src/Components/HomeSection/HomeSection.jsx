import { Avatar, Button } from "@mui/material";
import React from "react";
import profile from "../../assets/profile.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import ImageIcon from "@mui/icons-material/Image";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useState, useEffect } from "react";
import TweetCard from "./TweetCard";
import { useDispatch, useSelector } from "react-redux";
import {
  createTweet,
  getAllTweets,
  searchQuery,
} from "../../Store/Tweet/Action";
import { uploadToCloudinary } from "../../Utils/uploadToCloudinary";
import SearchIcon from "@mui/icons-material/Search";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function HomeSection() {
  const [uploadImage, setUploadImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [search, setSearch] = useState(false);
  const { tweet } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    content: Yup.string().required("Tweet text is required"),
  });
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
    const res = dispatch(createTweet(values));
    setSelectedImage(null);
    toast.promise(res, {
      loading: "Saving tweet...",
      success: <b>Tweet saved!</b>,
      error: <b>Please try again later</b>,
    });
  };

  const handleSelectImage = async (event) => {
    setUploadImage(true);
    const imgURL = await uploadToCloudinary(event.target.files[0]);
    formik.setFieldValue("img", imgURL);
    setSelectedImage(imgURL);
    setUploadImage(false);
  };
  const formik = useFormik({
    initialValues: {
      content: "",
      img: "",
      isTweet: true,
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  useEffect(() => {
    dispatch(getAllTweets());
  }, [
    tweet?.like,
    tweet?.retweet,
    tweet?.totalReplies,
    tweet?.replyTweets?.length,
    tweet?.replyTweet,
  ]);

  useEffect(() => {
    dispatch(getAllTweets());
  }, []);

  console.log("tweet", tweet);

  const handleSearch = (e) => {
    if (e.target.value.length === 0) {
      setSearch(false);
    } else {
      setSearch(true);
      dispatch(searchQuery(e.target.value));
    }
    console.log("searched", e.target.value, search);
  };

  return (
    <div className="space-y-5">
      <section className="py-5 sticky top-0 md:pt-5 bg-white z-50 dark:lg:bg-[#353941] dark:bg-transparent border-[#353941] pl-10 pr-10 hidden md:block">
        <span className="-translate-y-2 text-xl font-bold opacity-90">
          ConverseSphere
        </span>
        <span className="absolute top-0 right-0 pl-3">
          <form class="form relative">
            <button class="absolute left-2 -translate-y-1/2 top-1/2 p-1">
              <svg
                width="17"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="search"
                class="w-5 h-5 text-gray-700"
              >
                <path
                  d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                  stroke="currentColor"
                  stroke-width="1.333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <input
              class="input rounded-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
              placeholder="Search..."
              required=""
              type="text"
              onChange={handleSearch}
            />
            <button
              type="reset"
              class="absolute right-3 -translate-y-1/2 top-1/2 p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </form>
        </span>
      </section>
      {!search && (
        <section className={`pb-2 md:pb-10 pl-5 pr-5`}>
          <div className="flex space-x-5">
            <Avatar alt="username" src={profile} />
            <div className="w-full">
              <form onSubmit={formik.handleSubmit}>
                <div
                  className="grid
                  text-sm
                  after:px-3.5
                  after:py-2.5
                  [&>textarea]:text-inherit
                  after:text-inherit
                  [&>textarea]:resize-none
                  [&>textarea]:overflow-hidden
                  [&>textarea]:[grid-area:1/1/2/2]
                  after:[grid-area:1/1/2/2]
                  after:whitespace-pre-wrap
                  after:invisible
                  after:content-[attr(data-cloned-val)_'_']
                  after:border"
                >
                  <textarea
                    type="text"
                    name="content"
                    placeholder={`${t("WHATS_HAPPENING")}`}
                    rows={2}
                    className="w-full text-slate-600 border-transparent bg-transparent hover:border-slate-200 appearance-none rounded px-3.5 py-2.5 outline-none"
                    {...formik.getFieldProps("content")}
                  />
                  {formik?.errors?.content && formik?.touched?.content && (
                    <span className="text-red-500">
                      <br />
                      {formik?.errors?.content}
                    </span>
                  )}
                  <div>
                    {selectedImage && <img src={selectedImage} alt="image" />}
                  </div>
                  {/* <input type="submit" onClick={() => handleSubmit()} /> */}
                </div>
                <div className="flex justify-between items-center mt-5">
                  <div className="flex space-x-5 items-center">
                    <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                      <ImageIcon className="text-[#1d9bf0]" />
                      <input
                        type="file"
                        name="imageFile"
                        className="hidden"
                        onChange={handleSelectImage}
                      />
                    </label>
                    <FmdGoodIcon className="text-[#1d9bf0]" />
                    <TagFacesIcon className="text-[#1d9bf0] cursor-pointer" />
                  </div>
                  <div>
                    <Button
                      sx={{
                        width: "80%",
                        borderRadius: "20px",
                        py: "8px",
                        px: "20px",
                        bgcolor: "#1e88e5",
                        height: "40px",
                      }}
                      variant="contained"
                      type="submit"
                    >
                      Tweet
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
      <section className="pl-5 pr-5">
        {!search &&
          tweet?.tweets?.map((item) => (
            <>
              <hr class=" w-[80%] mx-auto h-px my-8 bg-gray-200 border-0" />
              <TweetCard tweetData={item} displayComments={true} />
            </>
          ))}
        {search &&
          tweet?.searchTweets[0]?.map((item) => (
            <>
              <hr class=" w-[80%] mx-auto h-px my-8 bg-gray-200 border-0" />
              <TweetCard tweetData={item} displayComments={true} />
            </>
          ))}
        {search &&
          tweet?.searchTweets[1]?.map((tweetData) => (
            <>
              <hr class=" w-[80%] mx-auto h-px my-8 bg-gray-200 border-0" />
              <div className="flex lg:space-x-5">
                <Avatar
                  className="cursor-pointer"
                  src={profile}
                  alt="username"
                  onClick={() => navigate(`/profile/${tweetData?.id}`)}
                />
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <div className="flex cursor-pointer items-center space-x-2">
                      <span
                        className="font-semibold hidden md:block"
                        onClick={() => navigate(`/profile/${tweetData?.id}`)}
                      >
                        {tweetData?.fullName || "Dummy account"}
                      </span>
                      <span className="text-gray-600 hidden md:block">.</span>
                      <span
                        className="text-gray-600"
                        onClick={() => navigate(`/profile/${tweetData?.id}`)}
                      >
                        @
                        {tweetData?.fullName
                          ?.split(" ")
                          .join("_")
                          .toLowerCase() || "Dummy account"}
                      </span>
                      {/* <img className="ml-2 w-5 h-5" src={verified} /> */}
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
                  </div>
                </div>
              </div>
            </>
          ))}
        <div className="flex justify-around mb-6 text-gray-400 font-lato font-light">
          You have reached the end!
        </div>
      </section>
    </div>
  );
}

export default HomeSection;
