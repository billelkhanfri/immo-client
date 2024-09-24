import {  useState } from "react";

import UserOffersCard from "./UserOffersCard";
import { Box, Button, Typography } from "@mui/material";

function SentByUser({pendingReferrals , requestData}) {
 
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
      {pendingReferrals?.length === 0 ? (
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
          {pendingReferrals?.map((referral) => (
            <UserOffersCard key={referral.id} offer={referral} requests = {requestData} />
          ))}
      
          {pendingReferrals?.length > 3 && (
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

export default SentByUser;
