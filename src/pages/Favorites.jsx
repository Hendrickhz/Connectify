import {
  Avatar,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useContactsStore } from "../store/contactsStore";
import { useEffect } from "react";
import Avvvatars from "avvvatars-react";
import useAvatarUrl from "../hooks/useAvatarUrl";
import ContactRow from "../components/form/ContactRow";
import useSnackbar from "../hooks/useSnackbar";

const Favorites = () => {
  const {
    contacts,
    loading,
    error,
    fetchFavorites,
    toggleFavorite,
    softDeleteContact,
  } = useContactsStore();
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);
  if (loading) {
    return (
      <div className=" w-full h-[80vh] flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className=" w-full h-[80vh] flex items-center justify-center">
        <Typography color="error">{error}</Typography>
      </div>
    );
  }
  return (
    <div>
      <div className="flex gap-2 items-center mb-5">
        <Typography variant="h5" className="">
          Favorites{" "}
        </Typography>{" "}
        <small>({contacts.length})</small>
      </div>
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table stickyHeader >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>

              <TableCell>Job Title & Company</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => {
              return (
                <ContactRow
                  key={contact.id}
                  contact={contact}
                  showSnackbar={showSnackbar}
                  isFavoritesPage={true}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <SnackbarComponent />
    </div>
  );
};

export default Favorites;
