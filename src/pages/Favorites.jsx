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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useContactsStore } from "../store/contactsStore";
import { useEffect } from "react";

import ContactRow from "../components/form/ContactRow";
import useSnackbar from "../hooks/useSnackbar";
import { useAuth } from "../context/authContext";

const Favorites = () => {
  const { contacts, loading, error, fetchFavorites } = useContactsStore();
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { session } = useAuth();
  const userId = session?.user?.id;
  useEffect(() => {
    fetchFavorites(userId);
  }, [fetchFavorites, userId]);
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
      {contacts.length > 0 ? (
        <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                {!isMobile && <TableCell>Email</TableCell>}
                <TableCell>Phone</TableCell>
                {!isMobile && <TableCell>Job Title & Company</TableCell>}
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
                    isMobile={isMobile}
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
