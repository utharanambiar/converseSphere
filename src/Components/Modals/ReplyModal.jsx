import React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  outline: "none",
  borderRadius: 4,
  padding: 2
};

function ReplyModal({ openReplyModal, handleCloseReplyModal }) {
  const navigate = useNavigate();
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
      tweetId: 3
    },
    onSubmit: handleSubmit,
    validationSchema,
  });
  return (
    <Modal
      open={openReplyModal}
      onClose={handleCloseReplyModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
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
              {/* <div>
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
                </div> */}
            </div>
            {/* <div className="mt-2">
                <div
                  onClick={() => navigate(`/tweet/${3}`)}
                  className="cursor-pointer"
                >
                  <p className="mb-2 p-0">
                    Twitter clone project for resume. Spring + react + sql{" "}
                  </p>
                  <img
                    className="w-[28rem] border border-gray-400 p-5 rounded-md"
                    src={verified}
                  />
                </div>
              </div> */}
          </div>
        </div>
        <section className={`mt-10`}>
            <div className="flex space-x-5">
              {/* <Avatar alt="username" src={profile} /> */}
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
      </Box>
    </Modal>
  );
}

export default ReplyModal;
