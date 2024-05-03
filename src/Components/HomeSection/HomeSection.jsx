import { Avatar, Button } from "@mui/material";
import React from "react";
import profile from "../../assets/profile.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import ImageIcon from "@mui/icons-material/Image";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useState } from "react";
import TweetCard from "./TweetCard";

function HomeSection() {
  const [uploadImage, setUploadImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    content: Yup.string().required("Tweet text is required"),
  });
  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleSelectImage = (event) => {
    setUploadImage(true);
    const imgURL = event.target.files[0];
    formik.setFieldValue("image", imgURL);
    setSelectedImage(imgURL);
    setUploadImage(false);
  };
  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });
  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">ConverseSphere</h1>
      </section>
      <section className={`pb-10`}>
        <div className="flex space-x-5">
          <Avatar alt="username" src={profile} />
          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  type="text"
                  name="content"
                  placeholder={`${t("WHATS_HAPPENING")}`}
                  className="border-none outline-none text-xl bg-transparent h-100"
                  {...formik.getFieldProps("content")}
                />
                {formik?.errors?.content && formik?.touched?.content && (
                  <span className="text-red-500">
                    <br />
                    {formik?.errors?.content}
                  </span>
                )}
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
        {[1, 1, 1].map(() => (
          <TweetCard />
        ))}
      </section>
    </div>
  );
}

export default HomeSection;
