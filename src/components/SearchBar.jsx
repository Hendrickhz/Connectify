import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import supabase from "../config/supabaseClient";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Popper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchItem from "./SearchItem";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const fetchContacts = async (searchQuery) => {
    setLoading(true);
    try {
      if (searchQuery == "") {
        setResults([]);
        return;
      }
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .ilike("first_name", `%${searchQuery}%`);

      if (error) {
        throw error;
      }
      setResults(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };


  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      fetchContacts(searchQuery);
    }, 300),
    []
  );

  // Handle input change and trigger debounced search
  const handleInputChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    setAnchorEl(event.currentTarget);
    debouncedSearch(value);
  };
  useEffect(() => {
    if (query === "") {
      setResults([]);
    }
  }, [query]);
  const handleItemClick = () => {
    setQuery("");
    setResults([]);
  };
  return (
    <div>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          value={query}
          onChange={handleInputChange}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Popper
        open={results.length > 0}
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{ zIndex: 100, width: isMobile ? "70%" : "30%" }}
      >
        <Paper elevation={3} className=" z-10">
          <List>
            {results.map((result) => (
              <SearchItem key={result.id} contact={result} handleItemClick={handleItemClick}  />
            ))}
          </List>
        </Paper>
      </Popper>
    </div>
  );
};

export default SearchBar;
