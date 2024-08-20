import { Container, Typography } from "@mui/material";
import React from "react";

function Error() {
  return (
    <Container>
      <Typography
        variant="h2"
        sx={{ mx: 4, textAlign: "center", color: "primary.main" }}
      >
        Erreur 404 : Page inexistante.
      </Typography>
    </Container>
  );
}

export default Error;
