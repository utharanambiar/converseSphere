import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import profile from "../../assets/profile.svg";
import { Avatar } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4,
};

export default function ProfileModal({ open, handleClose }) {
  const [uploading, setUploading] = React.useState(false);

  const handleSubmit = (values) => {
    console.log("submitted", values);
  };

  const handleBackgroundImageChange = (event) => {
    console.log("uploading new bg image");
    setUploading(true);
    const { name } = event.target;
    const file = event.target.files[0];
    formik.setFieldValue(name, file);
    setUploading(false);
  };

  const handleProfileImageChange = (event) => {
    console.log("uploading new profile image");
    setUploading(true);
    const { name } = event.target;
    const file = event.target.files[0];
    formik.setFieldValue(name, file);
    setUploading(false);
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      website: "",
      location: "",
      bio: "",
      backgroundImage: "",
      profileImage: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <div className="modal-content absolute bottom-0 bg-white drop-shadow-xl w-full animate-slideDown">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose} aria-label="close">
                  <CloseIcon />
                  <p className="text-sm">Edit profile</p>
                </IconButton>
              </div>
              <Button type="submit" onClick={handleClose}>
                Save
              </Button>
            </div>
            <div className="hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]">
              <React.Fragment>
                <div className="w-full">
                  <div className="relative">
                    <img
                      className="w-full h-[12rem] object-cover object-center bg-no-repeat"
                      src="https://cdn.pixabay.com/photo/2019/03/03/20/23/background-4032775_1280.png"
                      alt="background"
                    />
                    <input
                      type="file"
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      name="backgroundImage"
                      onChange={handleBackgroundImageChange}
                      accept="image/png, image/gif, image/jpeg, image/tiff, image/pdf"
                    />
                  </div>
                </div>
                <div className="w-full transform -translate-y-24 rounded-full ml-5 h-[6rem]">
                  <div className="relative">
                    <Avatar
                      src={profile}
                      sx={{
                        width: "10rem",
                        height: "10rem",
                        border: "4px solid white",
                      }}
                    />
                    <input
                      type="file"
                      className="absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer rounded-full"
                      name="profileImage"
                      onChange={handleProfileImageChange}
                      accept="image/png, image/gif, image/jpeg, image/tiff, image/pdf"
                    />
                  </div>
                </div>
              </React.Fragment>
              <div className="space-y-3">
                <TextField
                  fullWidth
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  value={formik?.values?.fullName}
                  onChange={formik.handleChange}
                  error={
                    formik?.touched?.name && Boolean(formik?.errors?.fullName)
                  }
                  helperText={formik?.touched?.name && formik?.errors?.fullName}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  id="bio"
                  name="bio"
                  label="Bio"
                  value={formik?.values?.bio}
                  onChange={formik.handleChange}
                  error={formik?.touched?.bio && Boolean(formik?.errors?.bio)}
                  helperText={formik?.touched?.bio && formik?.errors?.bio}
                />
                <TextField
                  fullWidth
                  id="website"
                  name="website"
                  label="Website"
                  value={formik?.values?.website}
                  onChange={formik.handleChange}
                  error={
                    formik?.touched?.website && Boolean(formik?.errors?.website)
                  }
                  helperText={
                    formik?.touched?.website && formik?.errors?.website
                  }
                />
                <TextField
                  fullWidth
                  id="location"
                  name="location"
                  label="Location"
                  value={formik?.values?.location}
                  onChange={formik.handleChange}
                  error={
                    formik?.touched?.location &&
                    Boolean(formik?.errors?.location)
                  }
                  helperText={
                    formik?.touched?.location && formik?.errors?.location
                  }
                />
                <div className="my-2">
                  <p className="text-lg">Date of Birth . Edit</p>
                  <p className="text-2xl">May 6, 2000</p>
                </div>
                <p className="py-3 text-lg">Edit Profession</p>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
