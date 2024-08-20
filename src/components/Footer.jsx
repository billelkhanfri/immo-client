import { Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import * as React from "react";
import { Link } from "react-router-dom";

const StyledTypography = styled(Typography)(({ variant }) => ({
  "&:hover": {
    textDecoration: variant !== "h6" ? "underline" : "none",
    cursor: variant !== "h6" ? "pointer" : "",
  },
}));

export default function Footer() {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          backgroundColor: { xs: "background.default", sm: "primary.main" },
          marginTop: "10vh",
          mx: "auto",
          minHeight: { xs: "0", md: "50vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <Grid
          container
          maxWidth="lg"
          spacing={{ xs: 0, md: 3 }}
          sx={{
            display: "flex",
            flexDirection: "row",
            margin: { xs: 0, sm: "auto" },
            backgroundColor: "background.default",
            color: "black",
            padding: { xs: 0, sm: 2 },
            borderRadius: { xs: 0, sm: 2 },
          }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 2,
              gap: 1,
            }}
          >
            <StyledTypography variant="h6">Pied de page</StyledTypography>
            <StyledTypography>Pied de page</StyledTypography>
            <StyledTypography>Pied de page</StyledTypography>
            <StyledTypography>Pied de page</StyledTypography>
            <StyledTypography>Pied de page</StyledTypography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 2,
              gap: 1,
            }}
          >
            <StyledTypography variant="h6">Pied de page</StyledTypography>
            <StyledTypography>Pied de page</StyledTypography>
            <StyledTypography>Pied de page</StyledTypography>
            <StyledTypography>Pied de page</StyledTypography>
            <StyledTypography>Pied de page</StyledTypography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 2,
              gap: 1,
            }}
          >
            <StyledTypography variant="h6">Pied de page</StyledTypography>
            <StyledTypography>Pied de page</StyledTypography>
            <StyledTypography>Pied de page</StyledTypography>
            <StyledTypography>Pied de page</StyledTypography>
            <StyledTypography>Pied de page</StyledTypography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 2,
              gap: 1,
            }}
          >
            <StyledTypography variant="h6">Pied de page</StyledTypography>
            <StyledTypography>Pied de page</StyledTypography>
            <StyledTypography>Pied de page</StyledTypography>
            <StyledTypography>Pied de page</StyledTypography>
            <StyledTypography>Pied de page</StyledTypography>
          </Grid>
          <Typography
            component={"div"}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              width: "100%",
              padding: 2,
              gap: 3,
            }}
          >
            <StyledTypography component={Link}>
              Informations légales
            </StyledTypography>
            <StyledTypography component={Link}>CGU</StyledTypography>
            <StyledTypography component={Link}>
              Politique de confidentialité
            </StyledTypography>
            <StyledTypography component={Link}>
              Gérer les traceurs
            </StyledTypography>
            <StyledTypography component={Link}>
              Aide et contact
            </StyledTypography>
          </Typography>
        </Grid>
      </Container>
    </>
  );
}
