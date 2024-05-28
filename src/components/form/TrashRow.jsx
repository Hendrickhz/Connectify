import {
  Avatar,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import Avvvatars from "avvvatars-react";
import useAvatarUrl from "../../hooks/useAvatarUrl";
import { Delete, DeleteForever, Edit, Favorite, FavoriteBorder, Replay } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContactsStore } from "../../store/contactsStore";
import DeleteContactButton from "../DeleteContactButton";
import { useFormatTime } from "../../hooks/useFormatTime";
import DeleteForeverButton from "../DeleteForeverButton";
import RestoreContactButton from "../RestoreContactButton";

const TrashRow = ({ contact, showSnackbar }) => {
  const [isHovered, setIsHovered] = useState(false);
  const avatarUrl = useAvatarUrl(contact.avatar_link);
  const navigate = useNavigate();
  const deletedAt = useFormatTime(contact.deleted_at);

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

      <TableCell>{deletedAt}</TableCell>
      <TableCell colSpan={1}>
        <div
          style={{ display: "flex", gap: "10px" }}
          className={`${
            isHovered ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          
          <RestoreContactButton  id={contact.id} showSnackbar={showSnackbar}/>
        

        
           <DeleteForeverButton id={contact.id} showSnackbar={showSnackbar}/>
       
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TrashRow;
