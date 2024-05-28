import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useContactsStore } from "../store/contactsStore";
import { useEffect } from "react";

import ContactRow from "../components/form/ContactRow";
import useSnackbar from "../hooks/useSnackbar";

const Favorites = () => {
  const { contacts, loading, error, fetchFavorites } = useContactsStore();
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
      {contacts.length > 0 ?(
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table stickyHeader>
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
    ) : (
        <Box>
          <Typography>No contact in Favorites.</Typography>
        </Box>
      )}
      <SnackbarComponent />
    </div>
  );
};

export default Favorites;
