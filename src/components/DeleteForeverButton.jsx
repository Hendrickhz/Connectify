import { Delete, DeleteForever } from "@mui/icons-material";
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

const DeleteForeverButton = ({ id, showSnackbar, isDetailPage = false }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { deleteContact } = useContactsStore();
  const navigate = useNavigate();
  console.log(id);
  const handleDelete = async () => {
    await deleteContact(id);
    showSnackbar("1 Contact Deleted Permanently.");
    handleClose();
    // setTimeout(() => {
      navigate("/trash");
    // }, 3000);
  };
  return (
    <div>
      {isDetailPage ? (
        <Button className=" normal-case" onClick={handleOpen}>
          Delete Forever
        </Button>
      ) : (
        <Tooltip title="Delete Forever">
        <IconButton onClick={handleOpen}>
          <DeleteForever />
        </IconButton>
        </Tooltip>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete from contacts permanently?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This contact will be permanently deleted from this account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className=" normal-case" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleDelete} className=" normal-case">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteForeverButton;
