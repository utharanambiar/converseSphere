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

  console.log(auth);

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
            }}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12} className="mt-20">
          <Button
            sx={{ borderRadius: "30px", py: "15px", bgcolor: "blue" }}
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            //onClick={()=>navigate('/verifyotp')}
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default SignInForm;
