import  { useState } from "react";
import OpenOffersCard from "./OpenOffersCard";
import { Box, Button, Typography } from "@mui/material";

function OpenReferrals({openReferrals}) {
    const [showAll, setShowAll] = useState(false);
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
    {openReferrals?.length === 0 ? (
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
        {openReferrals?.map((referral) => (
          <OpenOffersCard key={referral.id} open = {referral} />
        ))}
        {openReferrals?.length > 3 && (
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

export default OpenReferrals