import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import ToastMsg from "../components/ToastMsg";
import { GAME_ASSET } from "../assets";
import { PLAYGROUND_CONFIGURATION } from "../config/constants";
import Player from "./Player";
import Treat from "./Treat";
import PokemonSearch from "./PokemonSearch";

const berryPositions = [
  { x: 450, y: 0 },
  { x: 350, y: 0 },
  { x: 50, y: 250 },
  { x: 250, y: 250 },
  { x: 350, y: 0 },
  { x: 350, y: 400 },
  { x: 0, y: 0 },
];

const PlayGroundContainer = () => {
  const [playerPosition, setPlayerPosition] = useState({
    x: 0,
    y: 0,
    scale: -1,
  });
  const [berryPosition, setBerryPosition] = useState(berryPositions[0]);
  const [berryCount, setBerryCount] = useState(0);
  const [showToastMessage, setShowToastMessage] = useState("");

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // cleanup this component
    return () => {
      console.log("keydown event removed");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [berryPosition]);

  const handleKeyDown = (event) => {
    //check for only arrow keys
    //movement of the player is an increment of width of the player

    switch (event.key) {
      case "ArrowLeft":
        handlePlayerPositionUpdate(-PLAYGROUND_CONFIGURATION.playerWidth, 0, 1);
        break;
      case "ArrowRight":
        handlePlayerPositionUpdate(PLAYGROUND_CONFIGURATION.playerWidth, 0, -1);
        break;
      case "ArrowUp":
        handlePlayerPositionUpdate(0, -PLAYGROUND_CONFIGURATION.playerHeight);
        break;
      case "ArrowDown":
        handlePlayerPositionUpdate(0, PLAYGROUND_CONFIGURATION.playerHeight);
        break;
      default:
        //show message that only arrow keys works
        setShowToastMessage(
          "Only Arrow keys(Up, Down, Left, Right) are allowed."
        );
    }
  };

  const handlePlayerPositionUpdate = (xVal, yVal, scale) => {
    setPlayerPosition((prevVal) => {
      const updatedValue = { x: prevVal.x + xVal, y: prevVal.y + yVal };
      if (
        updatedValue.x < 0 ||
        updatedValue.y < 0 ||
        updatedValue.x >
          PLAYGROUND_CONFIGURATION.width -
            PLAYGROUND_CONFIGURATION.playerWidth ||
        updatedValue.y >
          PLAYGROUND_CONFIGURATION.height -
            PLAYGROUND_CONFIGURATION.playerHeight
      ) {
        setShowToastMessage("You have reached the wall.");
        return prevVal;
      }
      if (
        updatedValue.x === berryPosition.x &&
        updatedValue.y === berryPosition.y
      ) {
        let index = Math.floor(Math.random() * 5 + 1);
        if (
          berryPosition.x === berryPositions[index].x &&
          berryPosition.y === berryPositions[index].y
        ) {
          index += 1;
        }
        setBerryCount((currentCount) => currentCount + 1);
        setBerryPosition(berryPositions[index]);
      }
      return {
        x: prevVal.x + xVal,
        y: prevVal.y + yVal,
        scale: scale ? scale : prevVal.scale,
      };
    });
  };

  return (
    <>
      <Link to="/">Go Back</Link>
      <Box>Berry Count {berryCount}</Box>
      {!!showToastMessage && (
        <ToastMsg
          open={!!showToastMessage}
          message={showToastMessage}
          handleClose={() => setShowToastMessage("")}
        />
      )}
      <Box sx={{ border: "2px solid #964B00" }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid
            item
            sx={{
              width: PLAYGROUND_CONFIGURATION.width,
              height: PLAYGROUND_CONFIGURATION.height,
              backgroundColor: "grey",
              position: "relative",
            }}
          >
            <Player playerPosition={playerPosition}/>
            <Treat berryPosition={berryPosition}/>
          </Grid>
        </Grid>
      </Box>

      <PokemonSearch/>
    </>
  );
};

export default PlayGroundContainer;
