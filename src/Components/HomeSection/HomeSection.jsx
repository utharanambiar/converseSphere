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
import { createTweet, getAllTweets } from "../../Store/Tweet/Action";
import { uploadToCloudinary } from "../../Utils/uploadToCloudinary";

function HomeSection() {
  const [uploadImage, setUploadImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const { tweet } = useSelector((store) => store);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    content: Yup.string().required("Tweet text is required"),
  });
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
    dispatch(createTweet(values));
    setSelectedImage(null)
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

  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">ConverseSphere</h1>
      </section>
      <section className={`pb-2 md:pb-10`}>
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
      <section>
        {tweet?.tweets?.map((item) => (
          <>
            <hr class=" w-[80%] mx-auto h-px my-8 bg-gray-200 border-0" />
            <TweetCard tweetData={item} displayComments={true} />
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
