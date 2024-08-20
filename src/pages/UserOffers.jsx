import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SentByUser from "../components/SentByUser";
import RecievedByUser from "../components/RecievedByUser";

function UserOffers() {
  const [value, setValue] = useState(0);

  return (
    <Container sx={{ backgroundColor: "#FFFFFF", borderRadius: 2, padding: 2 }}>
      <Typography
        variant="h2"
        sx={{ mx: 4, textAlign: "center", color: "primary.main" }}
      >
        Mes Offres
      </Typography>
      <Box
        sx={{
          mt: 4,
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Mes offres envoyées" />
          <BottomNavigationAction label="Mes offres reçues" />
          <BottomNavigationAction label="Mes Offres Terminées" />
        </BottomNavigation>
        <Box mt={2}>
          {value === 0 && <SentByUser />}
          {value === 1 && <RecievedByUser />}
          {value === 2 && (
            <Typography variant="h6" textAlign={"center"}>
              Mes offres terminées
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default UserOffers;
