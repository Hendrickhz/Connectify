import {
  ArrowBack,
  DescriptionOutlined,
  Favorite,
  FavoriteBorder,
  LocalPhoneOutlined,
  LocationOnOutlined,
  MailOutline,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import { useContactsStore } from "../store/contactsStore";
import { useEffect } from "react";
import useAvatarUrl from "../hooks/useAvatarUrl";
import useSnackbar from "../hooks/useSnackbar";
import DeleteContactButton from "../components/DeleteContactButton";
import { useFormatTime } from "../hooks/useFormatTime";
import DeleteForeverButton from "../components/DeleteForeverButton";
import RestoreContactButton from "../components/RestoreContactButton";

const Detail = () => {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  };
  const { id } = useParams();
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const { contact, loading, error, fetchContactById, toggleFavoriteById } =
    useContactsStore();
  useEffect(() => {
    fetchContactById(id);
  }, [fetchContactById, id]);

  const handleToggleFavoriteById = async () => {
    await toggleFavoriteById(contact.id);
    showSnackbar(
      contact.is_favorite ? "Removed from favorites." : "Added to favorites.",
      "success"
    );
  };
  const avatarUrl = useAvatarUrl(contact?.avatar_link || "");
  console.log(avatarUrl);
  const deletedAt = useFormatTime(contact?.deleted_at);
  if (loading) {
    return (
      <div className=" w-full h-[80vh] flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className=" w-full h-[80vh] flex items-center justify-center">
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  return (
    <div>
      <div className=" md:w-[50%] w-[95%] md:pl-10 relative">
        {/* top section  */}
        <div className="  w-full bg-white z-10 flex justify-between items-center py-4 sticky md:top-[64px] top-[48px]">
          <IconButton onClick={handleBackToHome}>
            <ArrowBack />
          </IconButton>
          {contact.deleted_at == null ? (
            <div className=" flex gap-3 items-center">
              {contact.is_favorite ? (
                <IconButton onClick={handleToggleFavoriteById}>
                  <Favorite className=" text- text-pink-500" />
                </IconButton>
              ) : (
                <IconButton onClick={handleToggleFavoriteById}>
                  <FavoriteBorder />
                </IconButton>
              )}

              <Button
                variant="contained"
                onClick={() => navigate(`/edit/${contact.id}`)}
                className="  rounded-full px-6 py-2 normal-case "
              >
                Edit
              </Button>
              <DeleteContactButton id={id} showSnackbar={showSnackbar} />
            </div>
          ) : (
            ""
          )}
        </div>
        {/* top section  */}

        {/* avatar section  */}
        <div className="flex gap-8 items-center">
          <Avatar
            src={contact.avatar_link == null ? "" : avatarUrl}
            sx={{
              width: 150,
              height: 150,
            }}
          ></Avatar>
          <div className="">
            <Typography variant="h5">
              {contact.first_name + " " + contact.last_name}
            </Typography>
            {contact.company || contact.job_title ? (
              <p className="">
                {contact.job_title} - {contact.company}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* avatar section  */}
        <Divider className=" my-8" />

        {deletedAt ? (
          <div className="p-4 bg-slate-100  rounded-2xl mb-4 ">
            <Typography fontSize={20}>Why in Trash?</Typography>
            <p className=" mt-2">Deleted At {deletedAt}</p>
            <div className="w-full flex justify-end">
              <DeleteForeverButton
                id={contact.id}
                isDetailPage={true}
                showSnackbar={showSnackbar}
              />
              <RestoreContactButton
                id={contact.id}
                isDetailPage={true}
                showSnackbar={showSnackbar}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        {/* contact detail  */}
        <div className="p-4 bg-slate-100  rounded-2xl  ">
          <Typography fontSize={20}>Contact Details</Typography>

          <div className="mt-4 flex flex-col gap-2">
            {contact.email_1 ? (
              <div className=" flex gap-4 ">
                <MailOutline />{" "}
                <div className=" flex flex-col gap-4">
                  <Link
                    color={"inherit"}
                    underline={"hover"}
                    href={`mailto:${contact.email_1}`}
                  >
                    {contact.email_1}
                  </Link>
                  {contact.email_2 && (
                    <Link
                      color={"inherit"}
                      underline={"hover"}
                      href={`mailto:${contact.email_2}`}
                    >
                      {contact.email_2}
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <div className=" flex gap-4 ">
                <MailOutline />{" "}
                <RouterLink
                  to={`/edit/${contact.id}`}
                  className=" text-blue-600 no-underline"
                >
                  Add email
                </RouterLink>
              </div>
            )}
            <div className=" flex gap-4 ">
              <LocalPhoneOutlined />{" "}
              <div className="flex flex-col gap-4">
                <Link
                  color={"inherit"}
                  underline={"hover"}
                  href={`tel:${contact.phone_1}`}
                >
                  {contact.phone_1}
                </Link>
                {contact.phone_2 ?? (
                  <Link
                    color={"inherit"}
                    underline={"hover"}
                    href={`tel:${contact.phone_2}`}
                  >
                    {contact.phone_2}
                  </Link>
                )}
              </div>
            </div>

            {contact.city_address || contact.street_address ? (
              <div className=" flex gap-4 ">
                <LocationOnOutlined />{" "}
                <div className="flex flex-col gap-4">
                  <p>{contact.street_address} </p>
                  <p>{contact.city_address}</p>
                </div>
              </div>
            ) : contact.deleted_at == null ? (
              <div className=" flex gap-4 ">
                <LocationOnOutlined />{" "}
                <RouterLink
                  to={`/edit/${contact.id}`}
                  className=" text-blue-600 no-underline"
                >
                  Add address
                </RouterLink>
              </div>
            ) : (
              ""
            )}

            {contact.notes ? (
              <div className="flex gap-4">
                <DescriptionOutlined />
                <p>{contact.notes}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* contact detail  */}
      </div>
      <SnackbarComponent />
    </div>
  );
};

export default Detail;
