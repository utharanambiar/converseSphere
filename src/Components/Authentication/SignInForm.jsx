import React from "react";
import { Grid, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Store/Auth/Action";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function SignInForm() {
  const { auth } = useSelector((store) => store);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("sign in values", values);
      dispatch(loginUser(values));
      if (
        Object.keys(formik.errors).length === 0 &&
        !auth?.error &&
        !auth?.loading
      ) {
        navigate("/verifyotp");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            InputProps={{
              style: {
                borderRadius: "10px",
                backgroundColor: localStorage.getItem("theme") === "dark" ? "#353941" : "#fff",
              },
            }}
            InputLabelProps={{
              style: { color: localStorage.getItem("theme") === "dark" ? "#fff" : "#000" },
            }}
            sx={{ input: { color: localStorage.getItem("theme") === "dark" ? "white" : "#000" } }}
            id="email"
            label="Email Id"
            type="email"
            variant="outlined"
            size="large"
            value={formik?.values?.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            size="large"
            defaultValue={formik?.values?.password}
            onChange={formik.handleChange}
            InputLabelProps={{
              style: {
                color:
                  localStorage.getItem("theme") === "dark" ? "#fff" : "#000",
              },
            }}
            onBlur={formik.handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOffRoundedIcon />
                    ) : (
                      <VisibilityRoundedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                borderRadius: "10px",
                backgroundColor: localStorage.getItem("theme") === "dark" ? "#353941" : "#fff",
                color: localStorage.getItem("theme") === "dark" ? "white" : "#000",
              },
            }}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12} className="mt-20">
          <button
            sx={{ borderRadius: "30px", py: "15px", bgcolor: "blue" }}
            type="submit"
            fullWidth
            //variant="contained"
            size="large"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign In
          </button>
        </Grid>
      </Grid>
    </form>
  );
}

export default SignInForm;
