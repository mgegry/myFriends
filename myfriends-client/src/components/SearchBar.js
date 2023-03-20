import { Cancel, Search } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { COLORS } from "../values/colors";

const SearchBar = ({ barWidth, handleOnChange, iconEnd, handleCancel }) => {
  return (
    <FormControl variant="filled" sx={{ width: "100%", alignItems: "center" }}>
      <TextField
        id="password-field"
        variant="outlined"
        size="normal"
        sx={{ width: `${barWidth}`, backgroundColor: COLORS.white }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">Search</InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={handleCancel ? handleCancel : null}
                disabled={iconEnd === "search"}
              >
                {iconEnd === "cancel" ? <Cancel /> : <Search />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={handleOnChange}
      />
    </FormControl>
  );
};

export default SearchBar;
