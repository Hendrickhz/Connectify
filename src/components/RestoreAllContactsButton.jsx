import { Button } from "@mui/material";
import { useContactsStore } from "../store/contactsStore";


const RestoreAllContactsButton = ({  showSnackbar, }) => {
  const { restoreAllContacts } = useContactsStore();
  const handleRestoreAll = async () => {
    await restoreAllContacts();
    showSnackbar("All Contacts Restored.");
   
  };
  return (
    <Button size="small" onClick={handleRestoreAll}>Restore All</Button>
  );
};

export default RestoreAllContactsButton;
