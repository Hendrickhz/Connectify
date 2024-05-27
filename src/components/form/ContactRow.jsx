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

const ContactRow = ({ contact }) => {
  const [isHovered, setIsHovered] = useState(false);
  const avatarUrl = useAvatarUrl(contact.avatar_link);
  return (
    <TableRow
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      hover={isHovered}
    >
      <TableCell>
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
      <TableCell>{contact.email_1}</TableCell>
      <TableCell>{contact.phone_1}</TableCell>
      <TableCell>
        <p>{contact.job_title}</p>
        <small>{contact.company}</small>
      </TableCell>
      <TableCell colSpan={1}>
     
          <div style={{ display: "flex", gap: "10px" }}  className={`${isHovered ? 'visible opacity-100' :'invisible opacity-0'}`}>
            <Tooltip title="Edit">
              <IconButton
              //   onClick={() => onEdit(contact.id)}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title={contact.is_favorite ? "Unfavorite" : "Favorite"}>
              <IconButton
              //    onClick={() => onToggleFavorite(contact.id)}
              >
                {contact.is_favorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
              //   onClick={() => onDelete(contact.id)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </div>
       
      </TableCell>
    </TableRow>
  );
};

export default ContactRow;
