import { useState } from "react";
import DemandedOffersCard from "./DemandedOffersCard";
import { Box, Button, Typography, Chip } from "@mui/material";

function DemandedReferrals({requestData}) {

  const [showAllRequested, setShowAllReceived] = useState(false);
  const [showAllSent, setShowAllSent] = useState(false);

  // Determine how many offers to show based on the 'showAll' state
  const requestedOffersToShow = showAllRequested? requestData : requestData.slice(0, 3);

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
      {/* Received Referrals Section */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Offres reçues
        </Typography>

        {requestData?.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            Aucune offre reçue
          </Typography>
        ) : (
          <>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {requestedOffersToShow?.map((referral) => (
                <Box key={referral.id} sx={{ width: "100%" }}>
                  <Chip label="Attribuées" variant="outlined" />
                  <DemandedOffersCard requested={referral} />
                </Box>
              ))}
            </Box>

            {requestData?.length > 3 && (
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
                  onClick={() => setShowAllReceived(!showAllReceived)}
                >
                  {showAllReceived ? "Voir moins d'offre" : "Voir plus d'offre"}
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>

  
    </Typography>
  );
}

export default DemandedReferrals;
