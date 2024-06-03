import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SignInForm from "../Authentication/SignInForm";
import SignUpForm from "../Authentication/SignUpForm";
import { useLocation, useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: "none",
};

export default function AuthModal({ open, handleClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    const path = location?.pathname === "/signup" ? "/signin" : "/signup";
    navigate(path);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="w-[80vw] md:w-[60vw] overflow-y-auto max-h-[90vh] hideScrollBar"
        >
          <h1 className="text-center font-lato font-bold text-3xl pb-20">
            {location?.pathname === "/signup" ? "Create an account" : "Sign in to our platform"}
          </h1>
          {location?.pathname === "/signup" ? <SignUpForm /> : <SignInForm />}
          <div class="text-sm font-medium text-gray-500 dark:text-gray-300 font-lato mt-3">
            {location?.pathname === "/signup"
              ? "Already have an account?"
              : "If you don't have an account"}
            <button
              onClick={handleNavigate}
              class="text-blue-700 hover:underline dark:text-blue-500 font-lato ml-2"
            >
              {location?.pathname === "/signup" ? "Sign In" : "Sign up"}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
