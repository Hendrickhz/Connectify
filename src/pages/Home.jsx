import {
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
import { useEffect, useState } from "react";


import ContactRow from "../components/form/ContactRow";
import useSnackbar from "../hooks/useSnackbar";

const Home = () => {
  const {
    contacts,
    loading,
    error,
    fetchContacts,
    toggleFavorite,
    softDeleteContact,
  } = useContactsStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchContacts(rowsPerPage, page * rowsPerPage);
  }, [fetchContacts, page, rowsPerPage]);
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { showSnackbar, SnackbarComponent } = useSnackbar();
 

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
      <SnackbarComponent />
      <div className="flex gap-2 items-center mb-5">
        <Typography variant="h5" className="">
          Contacts{" "}
        </Typography>{" "}
        <small>({contacts.length})</small>
      </div>
      <TableContainer component={Paper} sx={{ maxHeight: 490 }}>
        <Table stickyHeader aria-label="sticky table" >
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
                  isFavoritesPage={false}
                  showSnackbar={showSnackbar}
                 
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={-1} // Total count is unknown
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Home;
