import { Search } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { COLORS } from "../values/colors";

const SearchBar = () => {
  const handleSearchClick = () => {};

  return (
    <FormControl variant="filled" sx={{ width: "100%", alignItems: "center" }}>
      <TextField
        id="password-field"
        variant="outlined"
        size="normal"
        sx={{ width: "50%", backgroundColor: COLORS.white }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">Search</InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={handleSearchClick}
              >
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};

export default SearchBar;
