import  { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";

const PendingOffersCard= ({ sent, requests, received}) => {
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
 const isSender = sent?.senderId=== userInfo.id
console.log(received)

 const statusTranslation = {
  pending: "En attente",
  rejected: "Rejeté",
  accepted: "Accepté",

};

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "space-between",
          width: "100%",
          maxWidth: "md",
          marginY: "15px",
          borderRadius: 2,
          padding: "20px",
          boxShadow: 1,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            gap: { sx: 1, md: 0 },
            padding: 0,
            "&:last-child": {
              paddingBottom: 0,
            },
          }}
        >
          <Box
            component={"div"}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Skeleton variant="text" width="30%" height={20} />
            <Skeleton variant="text" width="10%" height={20} />
          </Box>
          <Box
            component={"div"}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Skeleton variant="text" width="70%" height={30} />
            <Skeleton variant="rectangular" width="100px" height={30} />
          </Box>
          <Box
            component={"div"}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              gap: 2,
            }}
          >
            <Skeleton variant="text" width="5%" height={20} />
            <Skeleton variant="text" width="5%" height={20} />
            <Skeleton variant="text" width="5%" height={20} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date";
  
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  

  return (
   <>
   { sent && (<Card
      component={Link}
      to={`/offre/${sent?.referral.id}`}
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "space-between",
        width: "100%",
        maxWidth: "md",
        marginY: "15px",
        borderRadius: 2,
        padding: "20px",
        boxShadow: 1,
        transition: "box-shadow 0.4s cubic-bezier(0.5, 0.84, 0.44, 1)",

        ":hover": {
          cursor: "pointer",
          boxShadow: "0px 0px 5px 5px rgba(255,255,255,0.75)",
          "& .underline-on-hover": {
            textDecoration: "underline",
          },
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: { sx: 1, md: 0 },
          padding: 0,
          "&:last-child": {
            paddingBottom: 0,
          },
        }}
      >
        <Box
          component={"div"}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
    
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {sent?.sender.organisation}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {formatDate(sent?.updatedAt)}
          </Typography>
          <Typography
  sx={{ fontSize: 14 }}
  color={
    sent?.status === "rejected"
      ? "red"
      : sent?.status === "accepted"
      ? "green"
      : sent?.status === "pending"
      ? "orange"
      : "#2a52be"
  }
  gutterBottom
>
  { statusTranslation[sent?.status]}
</Typography>

        </Box>
        <Box
          component={"div"}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "baseline",
            paddingBottom: { xs: 1, md: 0 },
          }}
        >
          <Typography
            gutterBottom
            className="underline-on-hover"
            sx={{
              fontSize: "18px",
              width: "auto",
              maxWidth: { xs: "max-content", md: "70%" },
              overflow: "none",
              fontWeight: "400",
              textDecoration: "none", // Ensure no underline by default
            }}
          >
            {sent?.referral.commentaire}
          </Typography>
          <Button
            variant="outlined"
            sx={{
              fontSize: "13px",
              width: { xs: "100%", md: "max-content" },
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
          >
            Voir l'offre
          </Button>
        </Box>
       
         <Box
          component={"div"}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            gap: 2,
          }}
        ><Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {sent?.referral.typeDeReferral}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {sent?.referral.lieu}
      </Typography>
    
    </Box> 
          
      </CardContent>
    </Card> )}
    

    {received && ( 
        <>
        <Card
      component={Link}
      to={`/offre/${received?.referral.id}`}
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "space-between",
        width: "100%",
        maxWidth: "md",
        marginY: "15px",
        borderRadius: 2,
        padding: "20px",
        boxShadow: 1,
        transition: "box-shadow 0.4s cubic-bezier(0.5, 0.84, 0.44, 1)",

        ":hover": {
          cursor: "pointer",
          boxShadow: "0px 0px 5px 5px rgba(255,255,255,0.75)",
          "& .underline-on-hover": {
            textDecoration: "underline",
          },
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: { sx: 1, md: 0 },
          padding: 0,
          "&:last-child": {
            paddingBottom: 0,
          },
        }}
      >
        <Box
          component={"div"}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
    
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {received?.sender.organisation}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {formatDate(received?.updatedAt)}
          </Typography>
          <Typography
  sx={{ fontSize: 14 }}
  color={
    received?.status === "rejected"
      ? "red"
      : received?.status === "accepted"
      ? "green"
      : received?.status === "pending"
      ? "orange"
      : "#2a52be"
  }
  gutterBottom
>
{ statusTranslation[received?.status]}
</Typography>

        </Box>
        <Box
          component={"div"}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "baseline",
            paddingBottom: { xs: 1, md: 0 },
          }}
        >
          <Typography
            gutterBottom
            className="underline-on-hover"
            sx={{
              fontSize: "18px",
              width: "auto",
              maxWidth: { xs: "max-content", md: "70%" },
              overflow: "none",
              fontWeight: "400",
              textDecoration: "none", // Ensure no underline by default
            }}
          >
            {received?.referral.commentaire}
          </Typography>
          <Button
            variant="outlined"
            sx={{
              fontSize: "13px",
              width: { xs: "100%", md: "max-content" },
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
          >
            Voir l'offre
          </Button>
        </Box>
       
          <Box
          component={"div"}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            gap: 2,
          }}
        ><Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {received?.referral.typeDeReferral}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {received?.referral.lieu}
      </Typography>
    
    </Box> 
          
      </CardContent>
    </Card> 
    </>)}
   </>
    
  );
};

export default PendingOffersCard;
