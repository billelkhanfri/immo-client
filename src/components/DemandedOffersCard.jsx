import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, Button, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

const DemandedOffersCard = ({  requested }) => {
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isSender = requested?.senderId === userInfo.id;

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
            padding: 0,
            "&:last-child": {
              paddingBottom: 0,
            },
          }}
        >
          <Skeleton variant="text" width="70%" height={30} />
          <Skeleton variant="rectangular" width="100%" height={50} />
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
    <Card
      component={Link}
      to={`/offre/${requested?.referral.id }`}
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
            {requested?.referral.sender.organisation }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {formatDate(requested?.updatedAt )}
          </Typography>
          <Typography
            sx={{ fontSize: 14 }}
            color={
              requested?.status === "rejected"
                ? "red"
                : requested?.status === "accepted"
                ? "green"
                : requested?.status === "pending"
                ? "orange"
                : "#2a52be"
            }
            gutterBottom
          >
            {statusTranslation[requested?.status ] }
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
              fontWeight: "400",
              maxWidth: { xs: "100%", md: "70%" },
            }}
          >
            {requested?.referral.commentaire }
          </Typography>
          <Button
            variant="outlined"
            sx={{
              fontSize: "13px",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
          >
            Voir l'offre
          </Button>
        </Box>

        {/* Additional Information for Sent Offers */}
        {isSender && (
          <Box
            component={"div"}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              gap: 2,
            }}
          >
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              { requested?.referral.typeDeReferral}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {requested?.referral.lieu}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DemandedOffersCard;
