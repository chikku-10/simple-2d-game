import { Alert, Snackbar } from "@mui/material";
import React from "react";

const ToastMsg = ({
  open,
  handleClose,
  vertical = "top",
  horizontal = "center",
  message = "Something went wrong.Try again later.",
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      message={message}
      key={vertical + horizontal}
      autoHideDuration={5000}
    >
      <Alert onClose={handleClose} severity="error" sx={{ widht: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastMsg;
