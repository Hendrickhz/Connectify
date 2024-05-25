import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/authContext";
import CoverImage from "/cover-3.svg";

import useSnackbar from "../../hooks/useSnackbar";
import AuthPageHeader from "../../components/AuthPageHeader";
const Register = () => {
  const { signup } = useAuth();
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await signup(values.email, values.password);
        showSnackbar("Register Successful. Please Login");
      setTimeout(()=>{
        navigate("/login");
      },3000)
      } catch (error) {
        // setErrors({ server: error.message });
        showSnackbar(error.message, "error");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-blue-600 flex items-center justify-center">
        <img
          src={CoverImage}
          alt="Connectify"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <AuthPageHeader/>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
              margin="normal"
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
              margin="normal"
            />

            <Button
              type="submit"
              className="bg-blue-600 mt-4 py-3  text-[16px]"
              variant="contained"
              fullWidth
              disabled={formik.isSubmitting}
            >
              Register
            </Button>
            <div className="mt-4 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 font-semibold">
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
      <SnackbarComponent />
    </div>
  );
};

export default Register;
