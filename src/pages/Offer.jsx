import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  Grid,
  Box,
  Stack


} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getReferral } from "../redux/apiCalls/referralApiCall"; // Update the path according to your project structure
import { updateReferralStatus } from "../redux/apiCalls/referralApiCall"; // Adjust the path as necessary

import Chip from '@mui/material/Chip';

function formatDate(dateString) {
  const date = new Date(dateString);

  // Extract day, month, and year from the Date object
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  // Return the formatted date string
  return `${day}/${month}/${year}`;
}

function Offer() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { referral } = useSelector((state) => state.referrals);

  const date = referral?.createdAt;
  const formattedDate = formatDate(date);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    dispatch(getReferral(id));
    if (referral?.createdAt) {
      const createdAtDate = new Date(referral.createdAt);
      const countdownDate = new Date(createdAtDate.getTime() + 24 * 60 * 60 * 1000); // 24 hours later

      const updateCountdown = () => {
        const now = new Date();
        const difference = countdownDate - now;

        if (difference > 0) {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeRemaining('Expirée');
        }
      };

      updateCountdown(); // Initial call to set the countdown immediately
      const intervalId = setInterval(updateCountdown, 1000); // Update every second

      return () => clearInterval(intervalId); // Cleanup on component unmount
    }
  }, [referral?.createdAt, id]);
 
  const handleAccept = () => {
  
    dispatch(updateReferralStatus(id, "attribue"));
    dispatch(getReferral(id));
  };

  const handleReject = () => {
    
    dispatch(updateReferralStatus(id, "rejected"));
    dispatch(getReferral(id));
  };
  return (
    <Container sx={{ background: "white", borderRadius: 2, padding: 2 }}>
      <Button
        onClick={() => navigate(-1)}
        aria-label="Cliquer pour revenir en arrière"
        sx={{
          borderRadius: 2,
          border: "1px solid",
          ":hover": {
            backgroundColor: "primary.main",
            color: "white",
          },
        }}
      >
        <ArrowBackIosNewIcon />
      </Button>

      <Grid container spacing={2}>
        <Grid item xs={6}>
         
          <Chip
          
        label= { `${referral?.typeDeReferral}`.charAt(0).toUpperCase() +referral?.typeDeReferral.slice(1)}

        variant="contained"
        sx= {{
          mt:4,
          bgcolor:"secondary.main"
        }}
      />
   
          {/* Subtitle category */}
          <Typography component={"div"} sx={{ display: "flex", gap: 1, my: 1 }}>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography variant="subtitle1" sx={{ display: "flex", justifyContent:"center", alignItems:"center" }}>Lieu :  <SlLocationPin /></Typography>
         
        
            <Typography variant="subtitle1">{referral?.lieu}</Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
           
          </Typography>
          <Divider></Divider>
          {/* Offer informations */}
          <Typography variant="h5" paddingTop={2} paddingBottom={2}>
            Information Géneral
          </Typography>
{ referral?.senderId == userInfo.id  && referral?.status !== "Open"? ( <CardHeader
        avatar={
          <Avatar  aria-label="recipe"  sx={{ width: 56, height: 56 }} src ={referral?.receiver.Profile.imageUrl}>
        
          </Avatar>
        }
      
        title= "Agent partener"
        subheader = {referral?.receiver.firstName+ " " + referral?.receiver.lastName + " / "   + referral?.receiver.organisation.toUpperCase()} 
       
      />):( <CardHeader
        avatar={
          <Avatar  aria-label="recipe"  sx={{ width: 56, height: 56 }}src ={referral?.sender.Profile.imageUrl}>
        
          </Avatar>
        }
       title= "Agent partener"
      
        subheader = {referral?.sender.firstName +" "  + referral?.sender.lastName+ " / " + referral?.sender.organisation.toUpperCase()}
       
      />)}
         
          
 <Box container  sx={{ flexGrow: 1 , mt:4}}>
      <Grid container >
        <Grid  xs={6} padding="16px" >
          <Typography color="rgba(0,0,0,0.6)" fontWeight="600">Honnoraire </Typography>
          <Typography >{referral?.honnoraire} %</Typography>
        </Grid>
        <Grid  xs={6} padding="16px" >
          <Typography color="rgba(0,0,0,0.6)" fontWeight="600">Prix du bien </Typography>
          <Typography >{referral?.price} €</Typography>
        </Grid>
        <Grid   xs={6} padding="16px" >
          <Typography color="rgba(0,0,0,0.6)" fontWeight="600">Nature du Contact </Typography>
          <Typography >{referral?.natureDuContact.charAt(0).toUpperCase()+referral?.natureDuContact.slice(1)}</Typography>
        </Grid>
        <Grid  xs={6} padding="16px" >
          <Typography color="rgba(0,0,0,0.6)" fontWeight="600">Honnoraire </Typography>
          <Typography >{referral?.honnoraire} %</Typography>
        </Grid>
        
      
      </Grid>
    </Box>

        </Grid>
        <Grid item xs={6}>
          <Card>
            {/* <CardMedia sx={{ height: 140 }} /> */}
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Typography variant="h5">Info Client</Typography>
              <Typography variant="subtitle1">
                Nom : { referral?.status == "mondat" || referral?.senderId == userInfo?.id? referral?.client.nom : "*******"}
              </Typography>
              <Typography variant="subtitle1">
                Email : {referral?.status == "mondat" || referral?.senderId == userInfo.id? referral?.client.email : '*******'}
              </Typography>
              <Typography variant="subtitle1">
                Télephone : {referral?.status == "mondat" || referral?.senderId == userInfo.id ? referral?.client.telephone : '*******'}
              </Typography>

              <Typography> { referral?.status == "mondat"  || referral?.senderId == userInfo.id?"": "Les informations de contact seront fournies après la signature de l'accord de commission."} </Typography>

 { 
  <Stack spacing={referral?.senderId === userInfo.id ? 1 : 2} direction={referral?.senderId === userInfo.id ? "row" : "column"}>
    <Stack direction="row" gap={1}  alignItems="center">
      <Typography variant="subtitle1">Status:</Typography>   
      <Typography>
        <Chip
          label={referral?.status.charAt(0).toUpperCase() + referral?.status.slice(1)}
          variant="contained"
          sx={{
            bgcolor: referral?.status === "rejected"?"red" : "primary.main",
            color: "white"
          }}
        />
      </Typography>
    </Stack>

    {referral?.status === "pending" && (
      referral?.senderId === userInfo.id ? (
        <Typography variant="subtitle1">
          Temps restant: {timeRemaining}
        </Typography>
      ) : (
        <>
          <Button variant="contained" onClick={handleAccept} disabled={timeRemaining === "Expirée"}>Accepter</Button>
          <Button variant="outlined" color="error" onClick={handleReject} disabled={timeRemaining === "Expirée"}>Rejeter</Button>
          <Typography variant="subtitle1">
            Temps restant: 
            <Chip variant="contained" label={timeRemaining} 
              sx={{ bgcolor: "red", color: "white" }} 
            /> 
          </Typography>
        </>
      )
    )}
  </Stack>
}


             
              <Typography variant="caption">
                Publiée le {formattedDate} - Ref : REF
                {referral?.id.substring(0, 8)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Offer;
