import  { useState } from "react";
import UserOffersCard from "./UserOffersCard";
import { Box, Button, Typography , Chip} from "@mui/material";

function RecievedByUser({receivedReferral, attributedReferral}) {
 
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
      {receivedReferral?.length === 0 && attributedReferral?.length ===0 ? (
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
        

          {receivedReferral?.map((referral) => (
            <> 
<Chip label="Attribuées" variant="outlined" />
<UserOffersCard key={referral.id} offer={referral} />
            </>
          ))}
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


{attributedReferral?.map((referral) => (
  <> 
<Chip label="En attente" variant="outlined" />
            <UserOffersCard key={referral.id} offer={referral} />
            </>
          ))}
          {attributedReferral?.length > 3 && (
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
