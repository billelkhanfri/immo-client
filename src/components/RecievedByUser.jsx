import { useState } from "react";
import UserOffersCard from "./UserOffersCard";
import { Box, Button, Typography, Chip } from "@mui/material";

function RecievedByUser({ receivedReferral }) {
  const [showAll, setShowAll] = useState(false);
console.log(receivedReferral)
  // Determine how many offers to show based on the 'showAll' state
  const offersToShow = showAll ? receivedReferral : receivedReferral.slice(0, 3);
 return (
    <Typography
      component={"div"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center align the skeletons
        }}
      ></Box>

      {receivedReferral?.length === 0 ? (
        // No referrals message
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          Aucune offre trouvée
        </Typography>
      ) : (
        <>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2, // Add gap between offers
            }}
          >
            {offersToShow?.map((referral) => (
              <Box key={referral.id} sx={{ width: "100%" }}>
                <Chip label="Attribuées" variant="outlined" />
                <UserOffersCard offer={referral} />
              </Box>
            ))}
          </Box>

          {receivedReferral?.length > 3 && (
            <Box
              textAlign="center"
              mt={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Voir moins d'offre" : "Voir plus d'offre"}
              </Button>
            </Box>
          )}
        </>
      )}
    </Typography>
  );
}

export default RecievedByUser;
