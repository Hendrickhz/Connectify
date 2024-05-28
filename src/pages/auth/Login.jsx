import { Button, TextField } from "@mui/material";
import { useAuth } from "../../context/authContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import CoverImage from "/cover-3.svg";
import useSnackbar from "../../hooks/useSnackbar";
import AuthPageHeader from "../../components/AuthPageHeader";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showSnackbar, SnackbarComponent } = useSnackbar();

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
        await login(values.email, values.password);
        navigate("/");
      } catch (error) {
        showSnackbar(error.message, "error");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 flex items-center justify-center bg-blue-600 p-4">
        <img
          src={CoverImage}
          alt="Connectify"
          className="w-full h-full object-cover md:block hidden"
        />
      </div>
      <div className="md:w-1/2 flex items-center justify-center p-8 md:h-auto h-[80vh] ">
        <div className="max-w-md w-full">
          <AuthPageHeader />
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
              className="bg-blue-600 mt-4 py-3 text-[16px]"
              variant="contained"
              fullWidth
              disabled={formik.isSubmitting}
            >
              Login
            </Button>
            <div className="mt-4 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-blue-500 font-semibold">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
      <SnackbarComponent />
    </div>
  );
};

export default Login;
