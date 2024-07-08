import React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import verified from "../../assets/verified.svg";
import profile from "../../assets/profile.svg";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import ImageIcon from "@mui/icons-material/Image";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useDispatch, useSelector } from "react-redux";
import { createTweet } from "../../Store/Tweet/Action";
import toast from "react-hot-toast";
import { uploadToCloudinary } from "../../Utils/uploadToCloudinary";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  outline: "none",
  borderRadius: 4,
  padding: 2,
};

function CreateModal({ openCreateModal, handleCloseCreateModal }) {
  const navigate = useNavigate();
  const [uploadImage, setUploadImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    content: Yup.string().required("Tweet text is required"),
  });

  const handleSubmit = (values, actions) => {
    actions.resetForm();
    const res = dispatch(createTweet(values));
    setSelectedImage(null);
    toast.promise(res, {
      loading: "Saving tweet...",
      success: <b>Tweet saved!</b>,
      error: <b>Please try again later</b>,
    });
    handleCloseCreateModal();
  };

  const handleSelectImage = async(event) => {
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
  return (
    <Modal
      open={openCreateModal}
      onClose={handleCloseCreateModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="w-[350px] lg:w-[400px] hideScrollBar overflow-y-scroll overflow-x-hidden max-h-[80vh]">
        <div className="flex space-x-5">
          <Avatar
            className="cursor-pointer"
            src={auth?.user?.profileImage || profile}
            alt="username"
            //onClick={() => navigate(`/profile/${6}`)}
          />
          <div className="w-full">
            <div className="flex justify-between items-center">
              <div className="flex cursor-pointer items-center space-x-2">
                <span
                  className="font-semibold"
                  //onClick={() => navigate(`/profile/${6}`)}
                >
                  {auth?.user?.fullName}
                </span>
                <span className="text-gray-600">.</span>
                <span
                  className="text-gray-600"
                  //onClick={() => navigate(`/profile/${6}`)}
                >
                  {auth?.user?.username ||
                    `@${auth?.user?.fullName
                      ?.split(" ")
                      .join("_")
                      .toLowerCase()}`}
                </span>
                <img className="ml-2 w-5 h-5" src={verified} />
              </div>
            </div>
          </div>
        </div>
        <section className={`mt-10`}>
          <div className="flex space-x-5">
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
                    className="w-full text-slate-600 border-transparent hover:border-slate-200 appearance-none rounded px-3.5 py-2.5 outline-none"
                    {...formik.getFieldProps("content")}
                    rows={3}
                    onInput="this.parentNode.dataset.clonedVal = this.value"
                  />
                   <div>
                    {uploadImage && (
                      <div class="flex-col gap-4 w-full flex items-center justify-center">
                        <div class="w-10 h-10 md:w-20 md:h-20 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
                          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
                        </div>
                      </div>
                    )}
                    {selectedImage && <img src={selectedImage} alt="image" />}
                  </div>
                  {formik?.errors?.content && formik?.touched?.content && (
                    <span className="text-red-500">
                      <br />
                      {formik?.errors?.content}
                    </span>
                  )}
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
      </Box>
    </Modal>
  );
}

export default CreateModal;
