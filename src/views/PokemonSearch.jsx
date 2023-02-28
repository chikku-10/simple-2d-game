import React, { useRef } from "react";
import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const PokemonSearch = () => {
  const searchValue = useRef(null);

  const handleInputChange = (e) => {
    searchValue.current = e.target.value;
  };

  return (
    <Box display="flex" justifyContent="center">
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={handleInputChange}
      />
    <Box mt={2} ml={2}>
      <SearchIcon />
    </Box>
    </Box>
  );
};

export default PokemonSearch;
