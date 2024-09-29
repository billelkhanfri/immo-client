import { useState } from "react";
import InProgressOffersCard from "./InProgressOffersCard";
import { Box, Button, Typography, Chip } from "@mui/material";

function InProgressReferral({ receivedReferral, sentReferral }) {
  console.log(receivedReferral)
  const [showAllReceived, setShowAllReceived] = useState(false);
  const [showAllSent, setShowAllSent] = useState(false);

  // Determine how many offers to show based on the 'showAll' state
  const receivedOffersToShow = showAllReceived ? receivedReferral : receivedReferral.slice(0, 3);
  const sentOffersToShow = showAllSent ? sentReferral : sentReferral.slice(0, 3);

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

        {receivedReferral?.length === 0 ? (
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
              {receivedOffersToShow?.map((referral) => (
                <Box key={referral.id} sx={{ width: "100%" }}>
                  <Chip label="Attribuées" variant="outlined" />
                  <InProgressOffersCard received={referral} />
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
                  onClick={() => setShowAllReceived(!showAllReceived)}
                >
                  {showAllReceived ? "Voir moins d'offre" : "Voir plus d'offre"}
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>

      {/* Sent Referrals Section */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Offres envoyées
        </Typography>

        {sentReferral?.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            Aucune offre envoyée
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
              {sentOffersToShow?.map((referral) => (
                <Box key={referral.id} sx={{ width: "100%" }}>
                  <Chip label="Envoyées" variant="outlined" />
                  <InProgressOffersCard sent={referral} />
                </Box>
              ))}
            </Box>

            {sentReferral?.length > 3 && (
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
                  onClick={() => setShowAllSent(!showAllSent)}
                >
                  {showAllSent ? "Voir moins d'offre" : "Voir plus d'offre"}
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </Typography>
  );
}

export default InProgressReferral;
