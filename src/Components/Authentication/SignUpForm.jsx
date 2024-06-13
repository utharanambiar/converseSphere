import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { registerUser } from "../../Store/Auth/Action";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = Yup.object()
  .shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirmation is required"),
  })
  .default(undefined)
  .required();
const currentYear = new Date().getFullYear();

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

function SignUpForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [verifiedUser, setVerified] = useState(false);
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: {
        day: "",
        month: "",
        year: "",
      },
    },
    validationSchema,
    onSubmit: (values) => {
      const { day, month, year } = values.dateOfBirth;
      const dateOfBirth = `${year}-${month}-${day}`;
      values.dateOfBirth = dateOfBirth;
      console.log("sign up values", values);
      dispatch(registerUser(values));
      if (
        Object.keys(formik.errors).length === 0 &&
        !auth?.error &&
        !auth?.loading
      ) {
        navigate("/verifyotp");
      }
    },
  });

  const handleDateChange = (name) => (event) => {
    formik.setFieldValue("dateOfBirth", {
      ...formik.values.dateOfBirth,
      [name]: event.target.value,
    });
  };

  const handleFormSubmit = () => {
    formik.handleSubmit;
    //formik.handleSubmit && navigate("/verifyotp");
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="fullName"
            label="Full Name"
            type="text"
            variant="outlined"
            size="large"
            InputProps={{
              style: {
                borderRadius: "10px",
                backgroundColor:
                  localStorage.getItem("theme") === "dark" ? "#353941" : "#fff",
              },
            }}
            InputLabelProps={{
              style: {
                color:
                  localStorage.getItem("theme") === "dark" ? "#fff" : "#000",
              },
            }}
            sx={{ input: { color: localStorage.getItem("theme") === "dark" ? "white" : "#000" } }}
            defaultValue={formik?.values?.fullName}
            onChange={formik.handleChange}
            onSubmit={formik.onSubmit}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Id"
            type="email"
            variant="outlined"
            size="large"
            InputProps={{
              style: {
                borderRadius: "10px",
                backgroundColor:
                  localStorage.getItem("theme") === "dark" ? "#353941" : "#fff",
              },
            }}
            InputLabelProps={{
              style: {
                color:
                  localStorage.getItem("theme") === "dark" ? "#fff" : "#000",
              },
            }}
            sx={{ input: { color: localStorage.getItem("theme") === "dark" ? "white" : "#000" } }}
            defaultValue={formik?.values?.email}
            onChange={formik.handleChange}
            onSubmit={formik.onSubmit}
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
            InputLabelProps={{
              style: {
                color:
                  localStorage.getItem("theme") === "dark" ? "#fff" : "#000",
              },
            }}
            sx={{ input: { color: localStorage.getItem("theme") === "dark" ? "white" : "#000" } }}
            defaultValue={formik?.values?.password}
            onChange={formik.handleChange}
            // onSubmit={formik.onSubmit}
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
                backgroundColor:
                  localStorage.getItem("theme") === "dark" ? "#353941" : "#fff",
              },
            }}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="confirmPassword"
            label="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            size="large"
            InputLabelProps={{
              style: {
                color:
                  localStorage.getItem("theme") === "dark" ? "#fff" : "#000",
              },
            }}
            sx={{ input: { color: localStorage.getItem("theme") === "dark" ? "white" : "#000" } }}
            defaultValue={formik?.values?.confirmPassword}
            onChange={formik.handleChange}
            // onSubmit={formik.onSubmit}
            onBlur={formik.handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffRoundedIcon />
                    ) : (
                      <VisibilityRoundedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                borderRadius: "10px",
                backgroundColor:
                  localStorage.getItem("theme") === "dark" ? "#353941" : "#fff",
              },
            }}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </Grid>
        <Grid item xs={4}>
          <InputLabel sx={{ color: localStorage.getItem("theme") === "dark" ? "white" : "black" }}>Date</InputLabel>
          <Select
            fullWidth
            name="day"
            value={formik?.value?.dateOfBirth?.day}
            onChange={handleDateChange("day")}
            onBlur={formik.handleBlur}
            sx={{
              bgcolor:
                localStorage.getItem("theme") === "dark" ? "#353941" : "#fff",
                input: { color: localStorage.getItem("theme") === "dark" ? "white" : "#000" }
            }}
          >
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel sx={{ color: localStorage.getItem("theme") === "dark" ? "white" : "black" }}>Month</InputLabel>
          <Select
            fullWidth
            name="month"
            value={formik?.value?.dateOfBirth?.month}
            onChange={handleDateChange("month")}
            onBlur={formik.handleBlur}
            sx={{
              bgcolor:
                localStorage.getItem("theme") === "dark" ? "#353941" : "#fff",
            }}
          >
            {months.map((month) => (
              <MenuItem key={month.label} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel sx={{ color: localStorage.getItem("theme") === "dark" ? "white" : "black" }}>Year</InputLabel>
          <Select
            fullWidth
            name="year"
            value={formik?.value?.dateOfBirth?.year}
            onChange={handleDateChange("year")}
            onBlur={formik.handleBlur}
            sx={{
              bgcolor:
                localStorage.getItem("theme") === "dark" ? "#353941" : "#fff",
            }}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} className="mt-20">
          <button
            //sx={{ borderRadius: "30px", py: "15px", bgcolor: "blue" }}
            type="submit"
            fullWidth
            //variant="contained"
            size="large"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => verifiedUser && navigate("/verifyotp")}
          >
            Sign Up
          </button>
        </Grid>
      </Grid>
    </form>
  );
}

export default SignUpForm;
