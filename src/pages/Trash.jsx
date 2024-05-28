import { useEffect } from "react";
import useSnackbar from "../hooks/useSnackbar";
import { useContactsStore } from "../store/contactsStore";
import {
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
      <div className="flex gap-2 items-center mb-5">
        <Typography variant="h5" className="">
          Trash{" "}
        </Typography>{" "}
        <small>({contacts.length})</small>
      </div>
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
            
               <TrashRow contact={contact} key={contact.id} showSnackbar={showSnackbar}/>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <SnackbarComponent />
    </div>
  );
};

export default Trash;
