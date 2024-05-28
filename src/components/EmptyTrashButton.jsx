import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useContactsStore } from "../store/contactsStore";
import { useState } from "react";

const EmptyTrashButton = ({ showSnackbar }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { emptyTrash } = useContactsStore();

  const handleEmptyTrash = async () => {
    await emptyTrash();
    showSnackbar("Trash is empty.");
  };
  return (
    <>
      <Button size="small" onClick={handleOpen}>
        Empty Trash
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Empty the Trash?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            All the contacts in the Trash will be permanently deleted from this
            account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className=" normal-case" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleEmptyTrash} className=" normal-case">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmptyTrashButton;
