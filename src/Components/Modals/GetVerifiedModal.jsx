import * as React from "react";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import verified from "../../assets/verified.svg";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { verifiedModalData } from "../Data/VerifiedModalData";

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

export default function GetVerified({ open, handleClose }) {
  const [uploading, setUploading] = React.useState(false);
  const [plan, setPlan] = React.useState("Annually");

  const handleSubmit = (values) => {
    console.log("submitted", values);
  };

  const handleBackgroundImageChange = (event) => {
    setUploading(true);
    const { name } = event.target;
    const file = event.target.files[0];
    formik.setFieldValue(name, file);
    setUploading(false);
  };

  const handleProfileImageChange = (event) => {
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
          <div className="flex items-center space-x-3">
            <IconButton onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex justify-center py-5 hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]">
            <div className="w-[80%] space-y-10">
              <div className="p-5 rounded-md flex justify-between shadow-lg">
                <h1 className="text-xl pr-5">
                  Users with verified phone numbers will get verified status on
                  their profiles, once approved.
                </h1>
                <img src={verified} className="w-24 h-24" />
              </div>
              <div
                className={`flex justify-between border rounded-full px-5 py-3 ${
                  plan === "Annually" ? "border-black" : "border-gray-400"
                }`}
                onClick={() => setPlan("Annually")}
              >
                <div>
                  <span
                    className={`${
                      plan === "Annually" ? "text-black" : "text-gray-400"
                    }`}
                  >
                    Annually
                  </span>
                  <span className="text-green-500 text-sm ml-5">Save 12%</span>
                </div>
              </div>
              <div
                className={`flex justify-between border rounded-full px-5 py-3 ${
                  plan === "Monthly" ? "border-black" : "border-gray-400"
                }`}
                onClick={() => setPlan("Monthly")}
              >
                <div>
                  <span
                    className={`${
                      plan === "Monthly" ? "text-black" : "text-gray-400"
                    }`}
                  >
                    Monthly
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  {verifiedModalData.map((item) => (
                    <div className="w-full mb-2">
                      <FiberManualRecordIcon
                        sx={{ width: "7px", height: "7px", marginRight: "2px" }}
                      />
                      <span className="font-bold">{item?.title}: </span>
                      <span>{item?.data}</span>
                      <br />
                    </div>
                  ))}
                </div>
              </div>
              <div className="cursor-pointer flex justify-center bg-gray-700 rounded-full text-white py-3 px-5">
                {plan === "Annually" ? (
                  <>
                    <span className="line-through italic">₹ 4800</span>
                    <span className="px-5">₹ 4,224/year</span>
                  </>
                ) : (
                  <>
                    {/* <span className="line-through italic">₹ 400</span> */}
                    <span className="px-5">₹ 399/month</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
