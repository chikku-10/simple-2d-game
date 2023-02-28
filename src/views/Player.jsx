import { Box } from "@mui/material";
import React from "react";
import { GAME_ASSET } from "../assets";
import { PLAYGROUND_CONFIGURATION } from "../config/constants";

const Player = ({ playerPosition }) => {
  return (
    <Box
      sx={{
        width: PLAYGROUND_CONFIGURATION.playerWidth,
        height: PLAYGROUND_CONFIGURATION.playerHeight,
        left: playerPosition.x,
        top: playerPosition.y,
        position: "absolute",
      }}
    >
      <img
        src={GAME_ASSET.metapodImg}
        alt="pokemon metapod"
        width="100%"
        height="100%"
        style={{
          WebkitTransform: `scaleX(${playerPosition.scale})`,
          transform: `scaleX(${playerPosition.scale})`,
        }}
      />
    </Box>
  );
};

export default Player;
