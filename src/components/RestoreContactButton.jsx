import { Replay } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useContactsStore } from "../store/contactsStore";
import { useNavigate } from "react-router-dom";

const RestoreContactButton = ({ id, showSnackbar, isDetailPage = false }) => {
  const { restoreContact } = useContactsStore();
  const navigate = useNavigate();
  const handleRestore = async () => {
    await restoreContact(id);
    showSnackbar("1 Contact Restored.");
    // setTimeout(() => {
    //   navigate("/trash");
    // }, 3000);
  };
  return (
    <div>
      {isDetailPage ? (
        <Button onClick={handleRestore} className=" normal-case">
          Restore
        </Button>
      ) : (
        <Tooltip title="Restore">
        <IconButton onClick={handleRestore}>
          <Replay />
        </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default RestoreContactButton;
