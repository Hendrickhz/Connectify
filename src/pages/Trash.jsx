import { useEffect } from "react";
import useSnackbar from "../hooks/useSnackbar";
import { useContactsStore } from "../store/contactsStore";
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
import TrashRow from "../components/form/TrashRow";
import RestoreAllContactsButton from "../components/RestoreAllContactsButton";
import EmptyTrashButton from "../components/EmptyTrashButton";

const Trash = () => {
  const { contacts, loading, error, fetchTrashes } = useContactsStore();
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  useEffect(() => {
    fetchTrashes();
  }, [fetchTrashes]);
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
      <div className="flex gap-8 mb-5">
        <div className="flex gap-2 items-center ">
          <Typography variant="h5" className="">
            Trash{" "}
          </Typography>{" "}
          <small>({contacts.length})</small>
        </div>
        {contacts.length > 0 ? (
          <div className="flex gap-2">
            <RestoreAllContactsButton showSnackbar={showSnackbar} />
            <EmptyTrashButton showSnackbar={showSnackbar} />
          </div>
        ) : (
          ""
        )}
      </div>
      {contacts.length > 0 ? (
        <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>

                <TableCell>Date Deleted</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => {
                return (
                  <TrashRow
                    contact={contact}
                    key={contact.id}
                    showSnackbar={showSnackbar}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box>
          <Typography>No contact in Trash.</Typography>
        </Box>
      )}

      <SnackbarComponent />
    </div>
  );
};

export default Trash;
