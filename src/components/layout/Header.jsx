import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import SearchBar from "../SearchBar";
import { useContactsStore } from "../../store/contactsStore";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { logoutStore } = useContactsStore();
  const { logout, session } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      logoutStore();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" w-full">
      <div className=" w-full flex justify-between items-center">
        <div
          className=" flex gap-2 md:px-0 px-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/logo.png"
            className=" w-[30px] h-[30px] "
            alt="connectify-logo"
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            className=" md:block hidden"
          >
            Connectify
          </Typography>
        </div>
        <div className="flex gap-1 items-center">
          <SearchBar />
          <Tooltip title={`${session?.user?.email}`}>
            <IconButton size="large" onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
