import {
  Avatar,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import Avvvatars from "avvvatars-react";
import useAvatarUrl from "../../hooks/useAvatarUrl";
import { Delete, Edit, Favorite, FavoriteBorder } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContactsStore } from "../../store/contactsStore";
import DeleteContactButton from "../DeleteContactButton";
import { useAuth } from "../../context/authContext";

const ContactRow = ({ contact, isFavoritesPage, showSnackbar, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const avatarUrl = useAvatarUrl(contact.avatar_link);
  const navigate = useNavigate();
  const { toggleFavorite } = useContactsStore();

  const { session } = useAuth();
  const userId = session?.user?.id;
  const handleToggleFavorite = async () => {
    try {
      await toggleFavorite(contact.id, userId, isFavoritesPage);
      if (contact.is_favorite) {
        showSnackbar("Removed from the favorites");
      } else {
        showSnackbar("Added to the favorites");
      }
    } catch (error) {
      showSnackbar(error.message);
    }
  };
  return (
    <TableRow
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      hover={isHovered}
    >
      <TableCell
        className=" hover:cursor-pointer"
        onClick={() => navigate(`/contact/${contact.id}`)}
      >
        <div className="flex gap-1 items-center">
          {contact.avatar_link ? (
            <Avatar sizes={""} src={avatarUrl} />
          ) : (
            <Avvvatars size={40} value={contact.first_name} />
          )}{" "}
          <span>
            {contact.first_name} {contact.last_name}
          </span>
        </div>
      </TableCell>
      {!isMobile && <TableCell>{contact.email_1}</TableCell>}
      <TableCell>{contact.phone_1}</TableCell>
      {!isMobile && (
        <TableCell>
          <p>{contact.job_title}</p>
          <small>{contact.company}</small>
        </TableCell>
      )}
      <TableCell colSpan={1}>
        <div
          style={{ display: "flex", gap: "10px" }}
          className={`${
            isHovered ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <Tooltip title="Edit">
            <IconButton onClick={() => navigate(`/edit/${contact.id}`)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title={contact.is_favorite ? "Unfavorite" : "Favorite"}>
            <IconButton onClick={handleToggleFavorite}>
              {contact.is_favorite ? (
                <Favorite className=" text-pink-500" />
              ) : (
                <FavoriteBorder />
              )}
            </IconButton>
          </Tooltip>

          <DeleteContactButton id={contact.id} showSnackbar={showSnackbar} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ContactRow;
