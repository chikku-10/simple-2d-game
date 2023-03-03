import React, { useRef, useState } from "react";
import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import ToastMsg from "../components/ToastMsg";

const PokemonSearch = ({setIsTyping}) => {
  const searchValue = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setIsTyping(true);
    searchValue.current = e.target.value;
  };

  const getPokemonData = async () => {
    try {
      setLoading(true);
      if (!searchValue.current) {
        //show a msg to show
        setErrorMsg("Field is empty");
        return;
      }
      const responseData = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchValue.current.toLowerCase()}`
      );
      console.log("responseData", responseData);
      if (responseData.status === 200) {
        setPokemonData({name: responseData.data.species.name, url : responseData.data.sprites.front_shiny});
      } else {
        setErrorMsg("Failed to get the data. Please try again later");
        throw new Error("Failed to get the data. Please try again later");
      }
    } catch (e) {
      console.log("error", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastMsg
        open={!!errorMsg}
        handleClose={() => setErrorMsg(false)}
        message={errorMsg}
      />
      <Box display="flex" justifyContent="center" mt={3}>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={handleInputChange}
          onBlur={() => setIsTyping(false)}
          onClick={() => setIsTyping(true)}
        />
        <Box mt={2} ml={2}>
          <SearchIcon sx={{ cursor: "pointer" }} onClick={getPokemonData} />
        </Box>
      </Box>

      {loading ? (
        <Box>Loading</Box>
      ) : (
        <Box>
          {pokemonData && (
            <Box>
              <Box>Pokemon Name : {pokemonData.name.toUpperCase()}</Box>
              <img src={pokemonData.url} alt="pokemon" />
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default PokemonSearch;
