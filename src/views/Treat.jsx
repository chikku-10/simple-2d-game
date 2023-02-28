import { Box } from "@mui/material";
import React from "react";
import { GAME_ASSET } from "../assets";

const Treat = ({berryPosition}) => {
  return (
    <Box
      sx={{
        width: 50,
        height: 50,
        left: berryPosition.x,
        top: berryPosition.y,
        position: "absolute",
      }}
    >
      <img
        src={GAME_ASSET.hopoBerryImg}
        alt="hopo berry"
        width="100%"
        height="100%"
      />
    </Box>
  );
};

export default Treat;
