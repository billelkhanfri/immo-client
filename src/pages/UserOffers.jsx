import {
  BottomNavigation,

  Box,
  Container,
  Typography,
} from "@mui/material";
import  { useEffect, useState } from "react";


import SentByUser from "../components/SentByUser";
import RecievedByUser from "../components/RecievedByUser";
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from "react-redux";
import { getAllReferrals } from "../redux/apiCalls/referralApiCall";
function UserOffers() {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch(); // Redux dispatch function
  const { referrals } = useSelector((state) => state.referrals);
  // Fetch user data on component mount
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));


  // Fetch referral data on component mount
  useEffect(() => {
    dispatch(getAllReferrals());
  }, [dispatch]);

  const sentReferrals =
    referrals?.filter((referral) => referral.senderId === userInfo?.id) ;

 const receivedReferral = referrals?.filter((r)=> r.receiverId === userInfo?.id)
  return (
    <Container sx={{ backgroundColor: "#FFFFFF", borderRadius: 2, padding: 2 }}>
      <Typography
        variant="h2"
        sx={{ mx: 4, textAlign: "center", color: "primary.main" }}
      >
        Mes Offres
      </Typography>
      <Box
        sx={{
          mt: 4,
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
    <BottomNavigationAction
      label={
        <Box>
          <Badge
           badgeContent={sentReferrals?.length }
           color="error"
            sx={{
              '.MuiBadge-badge': {
                top: -5,
              },
            }}
          >
            Mes offres envoyées
          </Badge>
        </Box>
      }
    />
          <BottomNavigationAction label=  {   <Badge badgeContent= {receivedReferral?.length} color="error"  sx={{
              '.MuiBadge-badge': {
                top: -5,
              },
            }}>
          Mes offres reçues
    </Badge>} />
          <BottomNavigationAction label= { <Badge badgeContent={4}  color="error"  sx={{
              '.MuiBadge-badge': {
                top: -5,
              },
            }}>
          Mes Offres Terminées
    </Badge> } />
        </BottomNavigation>
        <Box mt={2}>
          {value === 0 && <SentByUser />}
          {value === 1 && <RecievedByUser />}
          {value === 2 && (
            <Typography variant="h6" textAlign={"center"}>
              Mes offres terminées
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default UserOffers;
