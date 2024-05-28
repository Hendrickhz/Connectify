import {
  Add,
  ArrowBack,
  Business,
  Close,
  Description,
  Favorite,
  FavoriteBorder,
  LocalPhone,
  LocationOn,
  MailOutline,
  PersonOutline,
} from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AvatarUpload from "../components/form/AvatarUpload";
import { useFormik } from "formik";
import * as Yup from "yup";
import useSnackbar from "../hooks/useSnackbar";
import { useAuth } from "../context/authContext";
import supabase from "../config/supabaseClient";

const Create = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [file, setFile] = useState(null);

  const [showPhone2Input, setShowPhone2Input] = useState(false);
  const [showEmail2Input, setShowEmail2Input] = useState(false);
  const handleShowPhone2Input = () => {
    setShowPhone2Input((prev) => !prev);
  };
  const handleShowEmail2Input = () => {
    setShowEmail2Input((prev) => !prev);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const { showSnackbar, SnackbarComponent } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      company: "",
      job_title: "",
      email_1: "",
      email_2: "",
      phone_1: "",
      phone_2: "",
      street_address: "",
      city_address: "",
      notes: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string("Enter your first name").required(
        "First name is required"
      ),
      last_name: Yup.string("Enter your last name").required(
        "Last name is required"
      ),
      company: Yup.string("Enter the company name"),
      job_title: Yup.string("Enter your job title"),
      email_1: Yup.string("Enter your primary email").email(
        "Enter a valid email"
      ),
      email_2: Yup.string("Enter your secondary email").email(
        "Enter a valid email"
      ),
      phone_1: Yup.string("Enter your primary phone number")
        .matches(/^[0-9]+$/, "Phone number must be digits")
        .required("Primary phone number is required"),
      phone_2: Yup.string("Enter your secondary phone number").matches(
        /^[0-9]+$/,
        "Phone number must be digits"
      ),
      street_address: Yup.string("Enter your street address"),
      city_address: Yup.string("Enter your city"),
      notes: Yup.string("Enter notes"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let avatarLink = null;
        if (file) {
          const fileExt = file.name.split(".").pop();
          const filePath = `${
            session.user.id
          }/${new Date().getTime()}.${fileExt}`;
          const { data, error } = await supabase.storage
            .from("avatars")
            .upload(filePath, file);

          if (error) throw error;
          avatarLink = data.path;
        }

        const { error } = await supabase.from("contacts").insert([
          {
            ...values,
            is_favorite: isFavorite,
            avatar_link: avatarLink,
            user_id: session.user.id,
          },
        ]);

        if (error) throw error;
        showSnackbar("Contact created successfully!", "success");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        showSnackbar(error.message, "error");
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className=" md:w-[50%] w-[95%] md:pl-10 relative">
      {/* top section  */}
      <div className="  w-full bg-white z-10 flex justify-between items-center py-4 sticky md:top-[64px] top-[48px]">
        <IconButton onClick={handleBackToHome}>
          <ArrowBack />
        </IconButton>
        <div className=" flex gap-3 items-center">
          {isFavorite ? (
            <IconButton onClick={handleFavorite}>
              <Favorite className=" text- text-pink-500" />
            </IconButton>
          ) : (
            <IconButton onClick={handleFavorite}>
              <FavoriteBorder />
            </IconButton>
          )}

          <Button
            variant="contained"
            onClick={formik.submitForm}
            className="  rounded-full px-6 py-2 normal-case "
          >
            Save
          </Button>
        </div>
      </div>
      {/* top section  */}

      {/* Avatar section  */}
      <AvatarUpload onFileSelect={setFile} />

      <form className=" flex flex-col gap-3 mb-8">
        <div className=" flex   gap-3 mt-4  w-full">
          <PersonOutline fontSize="medium" className=" text-gray-600 " />
          <div className=" flex flex-col w-full gap-3 ">
            <TextField
              className=" my-0 py-0"
              id="first_name"
              size="small"
              name="first_name"
              label="First Name"
              variant="outlined"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              helperText={formik.touched.first_name && formik.errors.first_name}
              fullWidth
              margin="normal"
            />
            <TextField
              className=" my-0 py-0"
              id="last_name"
              size="small"
              name="last_name"
              label="Last Name"
              variant="outlined"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
              helperText={formik.touched.last_name && formik.errors.last_name}
              fullWidth
              margin="normal"
            />
          </div>
        </div>
        <div className=" flex   gap-3 mt-4  w-full">
          <Business fontSize="medium" className=" text-gray-600 " />
          <div className=" flex flex-col w-full gap-3 ">
            <TextField
              className=" my-0 py-0"
              id="company"
              size="small"
              name="company"
              label="Company"
              variant="outlined"
              value={formik.values.company}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.company && Boolean(formik.errors.company)}
              helperText={formik.touched.company && formik.errors.company}
              fullWidth
              margin="normal"
            />
            <TextField
              className=" my-0 py-0"
              id="job_title"
              size="small"
              name="job_title"
              label="Job Title"
              variant="outlined"
              value={formik.values.job_title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.job_title && Boolean(formik.errors.job_title)
              }
              helperText={formik.touched.job_title && formik.errors.job_title}
              fullWidth
              margin="normal"
            />
          </div>
        </div>
        <div className=" flex   gap-3 mt-4  w-full">
          <MailOutline fontSize="medium" className=" text-gray-600 " />
          <div className=" flex flex-col w-full gap-3 ">
            <TextField
              className=" my-0 py-0"
              id="email_1"
              size="small"
              name="email_1"
              label="Email"
              variant="outlined"
              value={formik.values.email_1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email_1 && Boolean(formik.errors.email_1)}
              helperText={formik.touched.email_1 && formik.errors.email_1}
              fullWidth
              margin="normal"
            />
            {showEmail2Input ? (
              <div className=" relative">
                <TextField
                  className=" my-0 py-0"
                  id="email_2"
                  size="small"
                  name="email_2"
                  label="Email"
                  variant="outlined"
                  value={formik.values.email_2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.email_2 && Boolean(formik.errors.email_2)
                  }
                  helperText={formik.touched.email_2 && formik.errors.email_2}
                  fullWidth
                  margin="normal"
                />
                <IconButton
                  className=" absolute r-[-3%]"
                  onClick={handleShowEmail2Input}
                >
                  <Close />
                </IconButton>
              </div>
            ) : (
              <Button
                onClick={handleShowEmail2Input}
                variant="outlined"
                startIcon={<Add />}
                className="  normal-case rounded-full"
              >
                Add email
              </Button>
            )}
          </div>
        </div>
        <div className=" flex   gap-3 mt-4  w-full">
          <LocalPhone fontSize="medium" className=" text-gray-600 " />
          <div className=" flex flex-col w-full gap-3 ">
            <TextField
              className=" my-0 py-0"
              id="phone_1"
              size="small"
              name="phone_1"
              label="Phone"
              variant="outlined"
              value={formik.values.phone_1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone_1 && Boolean(formik.errors.phone_1)}
              helperText={formik.touched.phone_1 && formik.errors.phone_1}
              fullWidth
              margin="normal"
            />
            {showPhone2Input ? (
              <div
                className="relative
            "
              >
                <TextField
                  className=" my-0 py-0"
                  id="phone_2"
                  size="small"
                  name="phone_2"
                  label="Phone"
                  variant="outlined"
                  value={formik.values.phone_2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.phone_2 && Boolean(formik.errors.phone_2)
                  }
                  helperText={formik.touched.phone_2 && formik.errors.phone_2}
                  fullWidth
                  margin="normal"
                />
                <IconButton
                  className=" absolute r-[-3%]"
                  onClick={handleShowPhone2Input}
                >
                  <Close />
                </IconButton>
              </div>
            ) : (
              <Button
                onClick={handleShowPhone2Input}
                variant="outlined"
                startIcon={<Add />}
                className="  normal-case rounded-full"
              >
                Add phone
              </Button>
            )}
          </div>
        </div>
        <div className=" flex   gap-3 mt-4  w-full">
          <LocationOn fontSize="medium" className=" text-gray-600 " />
          <div className=" flex flex-col w-full gap-3 ">
            <TextField
              className=" my-0 py-0"
              id="city_address"
              size="small"
              name="city_address"
              label="City"
              variant="outlined"
              value={formik.values.city_address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.city_address &&
                Boolean(formik.errors.city_address)
              }
              helperText={
                formik.touched.city_address && formik.errors.city_address
              }
              fullWidth
              margin="normal"
            />
            <TextField
              className=" my-0 py-0"
              id="street_address"
              size="small"
              name="street_address"
              label="Street Address"
              variant="outlined"
              value={formik.values.street_address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.street_address &&
                Boolean(formik.errors.street_address)
              }
              helperText={
                formik.touched.street_address && formik.errors.street_address
              }
              fullWidth
              margin="normal"
            />
          </div>
        </div>
        <div className=" flex   gap-3 mt-4  w-full">
          <Description fontSize="medium" className=" text-gray-600 " />
          <div className=" flex flex-col w-full gap-3 ">
            <TextField
              className=" my-0 py-0"
              id="notes"
              size="small"
              name="notes"
              label="Notes"
              variant="outlined"
              value={formik.values.notes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.notes && Boolean(formik.errors.notes)}
              helperText={formik.touched.notes && formik.errors.notes}
              fullWidth
              margin="normal"
            />
          </div>
        </div>
      </form>

      <SnackbarComponent />
    </div>
  );
};

export default Create;
