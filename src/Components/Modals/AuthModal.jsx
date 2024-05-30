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
        <Box sx={style} className="w-[80vw] md:w-[60vw]">
          <h1 className="text-center font-lato font-bold text-3xl pb-20">
            Create your account
          </h1>
          {location?.pathname === "/signup" ? <SignUpForm /> : <SignInForm />}
          <h1 className="text-center py-5 font-lato font-semibold text-lg text-gray-500">
            {location?.pathname === "/signup"
              ? "Already have an account?"
              : "If you don't have an account"}
          </h1>
          <Button
            sx={{ borderRadius: "30px", py: "15px" }}
            type="submit"
            fullWidth
            variant="outlined"
            size="large"
            onClick={handleNavigate}
          >
            {location?.pathname === "/signup" ? "Sign In" : "Sign up"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
