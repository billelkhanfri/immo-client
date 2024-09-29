import {  useState } from "react";

import PendingOffersCard from "./PendingOffersCard";
import { Box, Button, Typography } from "@mui/material";

function PendingReferrals({pendingReferral , requestData}) {

  const [showAll, setShowAll] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const pendingSent = pendingReferral?.filter((p) => p.senderId === userInfo.id)
const pendingReceived = pendingReferral?.filter((p) => p.receivedId === userInfo.id)


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
      {pendingSent?.length === 0  && pendingReceived === 0 ? (
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
          Aucune offre en attente
        </Typography>
      ) : (
        <>
                <Typography> Envoyées</Typography>
                {pendingSent?.length === 0  && (
     
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
   )
 }

          {pendingSent?.map((referral) => (
            <PendingOffersCard key={referral.id} sent={referral} requests = {requestData} />
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



<Typography> Reçues</Typography>
{pendingReceived?.length === 0  && (
     
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
   )
 }

{pendingReceived?.map((referral) => (
            <PendingOffersCard key={referral.id} received={referral} requests = {requestData} />
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
    </Typography>
  );
}

export default PendingReferrals;
