import { useState } from "react";
import InProgressOffersCard from "./InProgressOffersCard";
import { Box, Button, Typography, Chip, BottomNavigation, BottomNavigationAction } from "@mui/material";

function InProgressReferral({ receivedReferral, sentReferral }) {
  const [value, setValue] = useState(0); // State for Bottom Navigation
  const [showAllReceived, setShowAllReceived] = useState(false);
  const [showAllSent, setShowAllSent] = useState(false);

  // Determine how many offers to show based on the 'showAll' state
  const receivedOffersToShow = showAllReceived ? receivedReferral : receivedReferral.slice(0, 3);
  const sentOffersToShow = showAllSent ? sentReferral : sentReferral.slice(0, 3);

  return (
   <> 
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label={`Offres Reçues (${receivedReferral?.length || 0})`}
        />
        <BottomNavigationAction
          label={`Offres Envoyées (${sentReferral?.length || 0})`}
        />
      </BottomNavigation>

      {/* Received Referrals Section */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        {value === 0 ? ( // Show this section if "Offres Reçues" is selected
          <>
       

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
          </>
        ) : (
          // Sent Referrals Section
          <>
           

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
          </>
        )}
      </Box>
      </>
  );
}

export default InProgressReferral;
