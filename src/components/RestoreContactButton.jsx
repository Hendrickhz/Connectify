import { Replay } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useContactsStore } from "../store/contactsStore";
import { useAuth } from "../context/authContext";

const RestoreContactButton = ({ id, showSnackbar, isDetailPage = false }) => {
  const { restoreContact } = useContactsStore();

  const { session } = useAuth();
  const userId = session?.user?.id;
  const handleRestore = async () => {
    await restoreContact(id,userId);
    showSnackbar("1 Contact Restored.");

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
