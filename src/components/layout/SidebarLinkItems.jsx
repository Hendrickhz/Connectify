import {
  AddCircleOutline,
  Delete,
  Favorite,
  Person,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
const links = [
  {
    text: "Contacts",
    url: "/",
    Icon: <Person />,
  },
  {
    text: "Create",
    url: "/create",
    Icon: <AddCircleOutline />,
  },
  {
    text: "Favorites",
    url: "/favorites",
    Icon: <Favorite />,
  },
  {
    text: "Trash",
    url: "/trash",
    Icon: <Delete />,
  },
];
const SidebarLinkItems = ({ open }) => {
  return (
    <List className=" pt-0">
      {links.map((link, index) => (
        <ListItem key={index} disablePadding sx={{ display: "block" }}>
          <NavLink to={link.url} className={"no-underline text-gray-700"}>
            {({ isActive }) => (
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  bgcolor: isActive ? "#1976d2" : "inherit",
                  "&:hover": {
                    bgcolor: isActive ? "#1565c0" : "#e0e0e0", 
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: isActive ? "white" : "inherit",
                  }}
                >
                  {link.Icon}
                </ListItemIcon>
                <ListItemText
                  primary={link.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: isActive ? "white" : "inherit",
                    fontWeight: isActive ? 'bold' : 'normal',
                  }}
                />
              </ListItemButton>
            )}
          </NavLink>
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarLinkItems;
