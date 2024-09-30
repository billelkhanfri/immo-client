import {
  BottomNavigation,

  Box,
  Container,
  Typography,
} from "@mui/material";
import  { useEffect, useState } from "react";

import {  getAllRequests } from "../redux/apiCalls/requestApiCall";

import {getAllReferralAttributes, getAttributeById} from "../redux/apiCalls/attributeApiCall"

import PendingReferrals from "../components/PendingReferrals";
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from "react-redux";
import { getAllReferrals } from "../redux/apiCalls/referralApiCall";
import OpenReferrals from "../components/OpenReferrals";
import DemandedReferrals from "../components/DemandedReferrals";
import InProgressReferral from "../components/InProgressReferral";

function UserOffers() {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch(); // Redux dispatch function
  const { referrals } = useSelector((state) => state.referrals);
  // Fetch user data on component mount
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const {requests} = useSelector((state)=> state.requests)
  const { attributes } = useSelector((state) => state.attributes);
  // Fetch referral data on component mount
  useEffect(() => {
    dispatch(getAllReferrals());
    dispatch(getAllRequests())
    dispatch(getAllReferralAttributes())
  }, [dispatch]);



 
  const requestData=  requests.filter((req) => req.requesterId === userInfo.id)
console.log(requestData)

 const receivedReferral =  referrals?.filter((r)=>  r.status !== "envoyé" &&  r.receiverId === userInfo?.id)
 const sentReferral =  referrals?.filter((r)=>  r.status !== "envoyé" &&  r.senderId=== userInfo?.id)
 const openReferrals = referrals?.filter((r)=>  r.status === "envoyé" && !r.isPending && r.senderId === userInfo?.id)
 const pendingReferral = attributes.filter((att)=> att.status === "pending" && (att.receivedId === userInfo.id || att.senderId === userInfo.id))

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
           badgeContent={openReferrals?.length }
           color="error"
            sx={{
              '.MuiBadge-badge': {
                top: -5,
              },
            }}
          >
            Mes offres ouvertes
          </Badge>
        </Box>
      }
    />
    <BottomNavigationAction
      label={
        <Box>
          <Badge
           badgeContent={pendingReferral?.length }
           color="error"
            sx={{
              '.MuiBadge-badge': {
                top: -5,
              },
            }}
          >
            Mes offres en attente
          </Badge>
        </Box>
      }
    />
          <BottomNavigationAction label=  {   <Badge badgeContent= { receivedReferral?.length + sentReferral?.length} color="error"  sx={{
              '.MuiBadge-badge': {
                top: -5,
              },
            }}>
          Mes offres en cours
    </Badge>} />
          <BottomNavigationAction label= { <Badge badgeContent={requestData?.length}  color="error"  sx={{
              '.MuiBadge-badge': {
                top: -5,
              },
            }}>
         Mes demandes 
    </Badge> } />
        </BottomNavigation>
        <Box mt={2}>
        {value === 0 && <OpenReferrals openReferrals = {openReferrals}/>}

          {value === 1 && <PendingReferrals  pendingReferral= {pendingReferral}/>}
          {value === 2 && <InProgressReferral receivedReferral = {receivedReferral} sentReferral = {sentReferral}/>}
          {value === 3 && <DemandedReferrals  requestData = {requestData}/>}
        </Box>
      </Box>
    </Container>
  );
}

export default UserOffers;
