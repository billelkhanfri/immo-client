import { Container, Typography } from "@mui/material";
import React from "react";

function TermsOfService() {
  return (
    <Container>
      <Typography
        variant="h2"
        sx={{ mx: 4, textAlign: "center", color: "primary.main" }}
      >
        Conditions d'utilisation
      </Typography>
    </Container>
  );
}

export default TermsOfService;
