import React from "react";
import useAvatarUrl from "../hooks/useAvatarUrl";
import { Avatar, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchItem = ({ contact,handleItemClick }) => {
  const avatarUrl = useAvatarUrl(contact.avatar_link);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/contact/${contact.id}`);
    handleItemClick();
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 1,
        bgcolor: 'background.paper',
        borderRadius: 1,
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'grey.100',
        },
      }}
    >
      <Avatar sx={{ width: 24, height: 24 }} src={avatarUrl} />
      <Typography variant="body1">{`${contact.first_name} ${contact.last_name}`}</Typography>
    </Box>
  );
};

export default SearchItem;
