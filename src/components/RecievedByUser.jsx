import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReferrals } from "../redux/apiCalls/referralApiCall";
import { getUserByID } from "../redux/apiCalls/userApiCall";
import UserOffersCard from "./UserOffersCard";
import { Box, Button, Typography } from "@mui/material";

function RecievedByUser() {
  const dispatch = useDispatch(); // Redux dispatch function
  const { referrals } = useSelector((state) => state.referrals);
  const { user } = useSelector((state) => state.auth); // Assuming user information is in auth state
  const [showAll, setShowAll] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    if (user?.id) {
      dispatch(getUserByID(user.id));
    }
  }, [dispatch, user]);

  // Fetch referral data on component mount
  useEffect(() => {
    dispatch(getAllReferrals());
  }, [dispatch]);

  // Filter referrals to include only those with receiverId matching userId
  const filteredReferrals =
    referrals?.filter((referral) => referral.receiverId === user?.id) || [];

  // Determine which referrals to display
  const displayedReferrals = showAll
    ? filteredReferrals
    : filteredReferrals.slice(0, 3);

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
      {filteredReferrals.length === 0 ? (
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
          {displayedReferrals.map((referral) => (
            <UserOffersCard key={referral.id} offer={referral} />
          ))}
          {filteredReferrals.length > 3 && (
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
