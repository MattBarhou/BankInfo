import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "30vh",
        }}
      >
        <Typography variant="h3">Welcome to the Bank Client</Typography>
        <Typography variant="h5">Interact using the navbar</Typography>
      </Box>
    </>
  );
}
