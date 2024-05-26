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
import { useAuth } from "../context/authContext";
import { useContactsStore } from "../store/contactsStore";
import { useEffect, useState } from "react";
import Avvvatars from "avvvatars-react";
import supabase from "../config/supabaseClient";

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
  const getAvatarUrl = (filePath) => {
    const {data}= supabase.storage.from('avatars').getPublicUrl(filePath);

    return data.publicUrl
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log(contacts);
  if (loading) {
    return (
      <div className=" w-full h-[80vh] flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <>
        <Typography color="error">{error}</Typography>
      </>
    );
  }
  return (
    <div>
      <Typography variant="h5">Contacts</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>

              <TableCell>Job Title & Company</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => {
            
              return (
                <TableRow key={contact.id}>
                  <TableCell>
                    <div className="flex gap-1 items-center">
                     {contact.avatar_link? <Avatar sizes={''} src={getAvatarUrl(contact.avatar_link)}/>: 
                      <Avvvatars size={40} value={contact.first_name} 
                      
                      />}{" "}
                      <span>
                        {contact.first_name} {contact.last_name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{contact.email_1}</TableCell>
                  <TableCell>{contact.phone_1}</TableCell>
                  <TableCell>
                    <p>{contact.job_title}</p>
                    <small>{contact.company}</small>
                  </TableCell>
                </TableRow>
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
