import { Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useContactsStore } from "../store/contactsStore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const DeleteContactButton = ({ id, showSnackbar, isDetailPage = false }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { softDeleteContact } = useContactsStore();
  const navigate = useNavigate();

  const { session } = useAuth();
  const userId = session?.user?.id;
  const handleDelete = async () => {
    await softDeleteContact(id, userId);
    showSnackbar("1 Contact Deleted.");
    handleClose();
    setTimeout(() => {
      if (isDetailPage) {
        navigate("/");
      }
    }, 1000);
  };
  return (
    <>
      <Tooltip title="Delete">
        <IconButton onClick={handleOpen}>
          <Delete />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete from contacts?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This contact will be moved to the Trash.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className=" normal-case" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleDelete} className=" normal-case">
            Move to Trash
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteContactButton;
