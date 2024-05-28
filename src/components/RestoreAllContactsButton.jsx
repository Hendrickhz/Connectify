import { Button } from "@mui/material";
import { useContactsStore } from "../store/contactsStore";
import { useAuth } from "../context/authContext";


const RestoreAllContactsButton = ({  showSnackbar, }) => {
  const { restoreAllContacts } = useContactsStore();
  const { session } = useAuth();
  const userId = session?.user?.id;
  const handleRestoreAll = async () => {
    await restoreAllContacts(userId);
    showSnackbar("All Contacts Restored.");
   
  };
  return (
    <Button size="small" onClick={handleRestoreAll}>Restore All</Button>
  );
};

export default RestoreAllContactsButton;
