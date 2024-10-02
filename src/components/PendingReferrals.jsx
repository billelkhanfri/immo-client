import { useState } from "react";
import PendingOffersCard from "./PendingOffersCard";
import { Box, Button, Typography, BottomNavigation, Badge } from "@mui/material";
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

function PendingReferrals({ pendingReferral, requestData }) {
  const [value, setValue] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const pendingSent = pendingReferral?.filter((p) => p.senderId === userInfo.id);
  const pendingReceived = pendingReferral?.filter((p) => p.receivedId === userInfo.id);

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
                   label={`Offres Envoyées (${pendingSent?.length || 0})`}

        />
        <BottomNavigationAction
         
          label={`Offres Reçues (${pendingReceived?.length || 0})`}
        />
      </BottomNavigation>

      <Box mt={2}>
        {value === 0 && pendingSent?.length === 0 && pendingReceived?.length === 0 ? (
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
            {value === 0 && (
              <>
                <Typography>Envoyées</Typography>
                {pendingSent?.length === 0 && (
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
                )}
                {pendingSent?.map((referral) => (
                  <PendingOffersCard key={referral.id} sent={referral} requests={requestData} />
                ))}
                {pendingSent?.length > 3 && (
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

            {value === 1 && (
              <>
                {pendingReceived?.length === 0 && (
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
                )}
                {pendingReceived?.map((referral) => (
                  <PendingOffersCard key={referral.id} received={referral} requests={requestData} />
                ))}
                {pendingReceived?.length > 3 && (
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
          </>
        )}
      </Box>
      </>
  );
}

export default PendingReferrals;
