import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import ToastMsg from "../components/ToastMsg";
import { PLAYGROUND_CONFIGURATION } from "../config/constants";
import Player from "./Player";
import Treat from "./Treat";
import PokemonSearch from "./PokemonSearch";

const PlayGroundContainer = () => {
  const [playerPosition, setPlayerPosition] = useState({
    x: 0,
    y: 0,
    scale: -1,
  });
  const [berryPosition, setBerryPosition] = useState({ x: 450, y: 0 });
  const [berryCount, setBerryCount] = useState(0);
  const [showToastMessage, setShowToastMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // cleanup this component
    return () => {
      console.log("keydown event removed-------------");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [berryPosition, isTyping]);

  const handleKeyDown = (event) => {
    //check for only arrow keys
    //movement of the player is an increment of width of the player
    if (isTyping) return;
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
      //berry and player at same position
      if (
        updatedValue.x === berryPosition.x &&
        updatedValue.y === berryPosition.y
      ) {
        //updating next berry position
        const maxIndex =
          PLAYGROUND_CONFIGURATION.width /
            PLAYGROUND_CONFIGURATION.playerWidth -
          2;
        console.log("maxIndex", maxIndex);
        let xIndex = Math.floor(Math.random() * maxIndex + 1);
        let yIndex = Math.floor(Math.random() * maxIndex + 1);

        console.log("x:", xIndex, "y:", yIndex);

        let xCoordinate = xIndex * PLAYGROUND_CONFIGURATION.playerWidth;
        let yCoordinate = yIndex * PLAYGROUND_CONFIGURATION.playerWidth;

        if (
          berryPosition.x === xCoordinate &&
          berryPosition.y === yCoordinate
        ) {
          //same at same position
          if (xIndex - 1 < 0) {
            xIndex += 1;
          } else if (xIndex + 1 > maxIndex) {
            xIndex -= 1;
          } else if (yIndex - 1 < 0) {
            yIndex += 1;
          } else if (yIndex + 1 > maxIndex) {
            yIndex -= 1;
          } else {
            xIndex += 1
          }
        }

        xCoordinate = xIndex * PLAYGROUND_CONFIGURATION.playerWidth;
        yCoordinate = yIndex * PLAYGROUND_CONFIGURATION.playerWidth;

        setBerryCount((currentCount) => currentCount + 1);
        setBerryPosition({ x: xCoordinate, y: yCoordinate });
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
      <Link to="/landingPage">To Landing Page</Link>
      <Box>Berry Count {berryCount}</Box>
      {!!showToastMessage && (
        <ToastMsg
          open={!!showToastMessage}
          message={showToastMessage}
          handleClose={() => setShowToastMessage("")}
        />
      )}
      <Grid container justifyContent="space-between">
        <Grid item md={6} xs={12}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid
              item
              sx={{
                minWidth: PLAYGROUND_CONFIGURATION.width,
                height: PLAYGROUND_CONFIGURATION.height,
                backgroundColor: "grey",
                position: "relative",
                border: "2px solid #964B00",
              }}
            >
              <Player playerPosition={playerPosition} />
              <Treat berryPosition={berryPosition} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <PokemonSearch setIsTyping={setIsTyping} />
        </Grid>
      </Grid>
    </>
  );
};

export default PlayGroundContainer;
