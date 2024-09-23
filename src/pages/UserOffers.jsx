import {
  BottomNavigation,

  Box,
  Container,
  Typography,
} from "@mui/material";
import  { useEffect, useState } from "react";

import {  getAllRequests } from "../redux/apiCalls/requestApiCall";

import SentByUser from "../components/SentByUser";
import {getAllReferralAttributes} from "../redux/apiCalls/attributeApiCall"

import RecievedByUser from "../components/RecievedByUser";
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from "react-redux";
import { getAllReferrals } from "../redux/apiCalls/referralApiCall";
import OpenReferrals from "../components/OpenReferrals";
function UserOffers() {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch(); // Redux dispatch function
  const { referrals } = useSelector((state) => state.referrals);
  // Fetch user data on component mount
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const {requests} = useSelector((state)=> state.requests)
  const { attributes } = useSelector((state) => state.attributes);
  console.log(userInfo.id)
  console.log(attributes)
  const attributedReferral = attributes?.filter((att)=> att.receivedId == userInfo.id 
  )
console.log(attributes)
  console.log(attributedReferral)

  // Fetch referral data on component mount
  useEffect(() => {
    dispatch(getAllReferrals());
    dispatch(getAllRequests())
    dispatch(getAllReferralAttributes())
  }, [dispatch]);
  const filteredRequest =  requests.filter((req) => req.requesterId === userInfo.id).map((ref)=> ref.referral)
  const requestData=  requests.filter((req) => req.requesterId === userInfo.id)


  const sentReferrals =
    referrals?.filter((referral) => referral.senderId === userInfo?.id && referral.status !== "envoyé") ;

 const receivedReferral = referrals?.filter((r)=> r.receiverId === userInfo?.id && r.status !== "envoyé")
 const openReferrals = referrals?.filter((r)=> r.status === "envoyé" && r.senderId === userInfo?.id)
const referralAttributedBody =  referrals?.filter((r)=> r.receiverId === userInfo?.id && r.status === "envoyé")

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
          <BottomNavigationAction label=  {   <Badge badgeContent= { receivedReferral?.length + attributedReferral?.length} color="error"  sx={{
              '.MuiBadge-badge': {
                top: -5,
              },
            }}>
          Mes offres reçues
    </Badge>} />
          <BottomNavigationAction label= { <Badge badgeContent={filteredRequest?.length}  color="error"  sx={{
              '.MuiBadge-badge': {
                top: -5,
              },
            }}>
         Mes Offres demandées
    </Badge> } />
        </BottomNavigation>
        <Box mt={2}>
        {value === 0 && <OpenReferrals openReferrals = {openReferrals}/>}

          {value === 1 && <SentByUser sentReferrals = {sentReferrals}/>}
          {value === 2 && <RecievedByUser receivedReferral = {receivedReferral} attributedReferral = {referralAttributedBody}/>}
          {value === 3 && <SentByUser sentReferrals = {filteredRequest} requestData = {requestData}/>}
        </Box>
      </Box>
    </Container>
  );
}

export default UserOffers;
