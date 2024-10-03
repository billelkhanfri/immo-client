import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import {  FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
Box,
  Stack,
  Chip,
  Avatar,
  CardHeader,
 
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getReferral, updateReferralStatus } from "../redux/apiCalls/referralApiCall";
import { createReferralRequest,getRequest, getAllRequests } from "../redux/apiCalls/requestApiCall";
import StepperComponent from "../components/Stepper";
import ReferralRequests from "../components/ReferralRequests";
import { getAllUsers } from "../redux/apiCalls/userApiCall";
import UserAttributed from "../components/UserAttributed";
import {getAllReferralAttributes, getAttributeById, updateReferralAttributeStatus} from "../redux/apiCalls/attributeApiCall"


function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid Date";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}



function Offer() {
  const [timeRemaining, setTimeRemaining] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { referral } = useSelector((state) => state.referrals);
  const { attributes, attribute } = useSelector((state) => state.attributes);
  const allUsers = useSelector((state) => state.user.allUsers);
  const {request, requests} = useSelector((state)=> state.requests)

//conditions
  const isSender = referral?.senderId === userInfo.id;
  const isReceiver = referral?.receiverId === userInfo.id;
  const isOpen = referral?.receiverId === null;
   const isRequested = request?.referralId === id

   const isWaitingAttribution = attribute?.some((att) => 
    att.senderId === userInfo.id &&
    att.referralId === id &&
    att.status === "pending" 
   
  );
  const isWaitingAttributionReceiver = attribute?.some((att) => 
    att.receivedId === userInfo.id &&
    att.referralId === id &&
    att.status === "pending" 
  );
  const isExpiredSender = attribute?.some((att) => 
    att.senderId === userInfo.id &&
    att.referralId === id &&
    att.status === "expired" 
  );

  const isExpiredReceiver = attribute?.some((att) => 
    att.receivedId === userInfo.id &&
    att.referralId === id &&
    att.status === "expired" 
  );

  const isRequestedSender = requests?.find((att) => 
    att.requesterId === userInfo.id &&
    att.referralId === id &&
    att.status === "pending" 
)

const isRequestedReceiver = requests?.find((att) => 
  att.referral.senderId=== userInfo.id &&
  att.referralId === id &&
  att.status === "pending" 
)

 const attributedReferral = attributes?.find((att)=> (att.receivedId === userInfo.id && att.referralId === id ))
 const attribution = attributes?.find((att)=> (att.senderId === userInfo.id && att.referralId === id ))
 const filteredRequest =  requests.find((req) => req.requesterId === userInfo.id && req.referralId === id)



const requested = requests.find((req) => req.requesterId === userInfo.id && req.referralId === id)
const isRequester = requested?.requesterId === userInfo.id

  useEffect(() => {
   dispatch(getAllRequests())
   dispatch(getAllUsers())
   dispatch(getAllReferralAttributes())
   dispatch(getAttributeById(id))
  
  }, []);



  useEffect(() => {
    dispatch(getReferral(id));
    dispatch(getRequest(id))
  
  }, [dispatch, id]);

  

  useEffect(() => {
    if (request?.status) {
      dispatch(getRequest(id)); 
      dispatch(getReferral(id));
    }
  }, [request?.status]); 
 
  useEffect(() => {
    if (referral?.createdAt) {
      const createdAtDate = new Date(referral.createdAt);
      const countdownDate = new Date(createdAtDate.getTime() + 0.9 * 60 * 60 * 1000);
  
      const updateCountdown = () => {
        const now = new Date();
        const difference = countdownDate - now;
  
        if (difference > 0) {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeRemaining("Expirée");
        }
      };
  
      updateCountdown();
      const intervalId = setInterval(updateCountdown, 1000);
  
      return () => clearInterval(intervalId);
    }
  }, [referral?.createdAt]); // referral?.createdAt is the only dependency
  
  const handleRequest = async () => {
    await dispatch(createReferralRequest(referral?.id));
    await dispatch(getReferral(id));
    await dispatch(getRequest(id)); // Fetch updated request after referral request
  };
  

  const handleReject = async () => {
    await dispatch(updateReferralAttributeStatus(id, "rejected"));
    await dispatch(getReferral(id)); 
  };
  const handleAccept = async () => {
    await dispatch(updateReferralAttributeStatus(id, "accepted"));
    await dispatch(getReferral(id)); 

 };
  const handleExpire =  async ()=> {
    if (timeRemaining === "Expirée"){
      await dispatch(updateReferralAttributeStatus(id, "expired"))
      await dispatch(getReferral(id)); 

    }
  }
  useEffect(()=> {
    if (timeRemaining === "Expirée"){
handleExpire()
    }
  },[timeRemaining])

  const handleUpdateReferralStatus = async (status) => {
    await dispatch(updateReferralStatus(id, status));
    console.log(status)
  };
 


 

  const renderReferralStatus = () => (
    <Stack spacing={isSender ? 1 : 2} direction={isSender ? "row" : "column"}>
    

      {isWaitingAttribution && 
          (
          <Stack variant="subtitle1" flexDirection="row" alignItems="center" justifyContent="center" gap={1}>
              <Typography> Temps restant:  </Typography>
           
             <Chip variant="contained" label={timeRemaining} 
              sx={{ bgcolor: "red", color: "white" }} 
            />  
          </Stack>  
        ) }
           {isExpiredSender &&  
          (
          <Stack variant="subtitle1" flexDirection="row" alignItems="center" justifyContent="center" gap={1}>
              <Typography> Temps restant:  </Typography>
           
             <Chip variant="contained" label={timeRemaining} 
              sx={{ bgcolor: "red", color: "white" }} 
            />  
          </Stack>  
        ) }
        {isWaitingAttributionReceiver &&(
          <>
            <Button variant="contained" onClick={handleAccept} disabled={timeRemaining === "Expirée"}>
              Accepter
            </Button>
            <Button variant="outlined" color="error" onClick={handleReject} disabled={timeRemaining === "Expirée"}>
              Rejeter
            </Button>
            <Stack variant="subtitle1" flexDirection="row" alignItems="center" justifyContent="center" gap={1}>
              <Typography> Temps restant:  </Typography>
           
             <Chip variant="contained" label={timeRemaining} 
              sx={{ bgcolor: "red", color: "white" }} 
            />  
          </Stack>                  
            
          </>
        )}
            {isExpiredReceiver  &&(
          <>
            <Button variant="contained" onClick={handleAccept} disabled={timeRemaining === "Expirée"}>
              Accepter
            </Button>
            <Button variant="outlined" color="error" onClick={handleReject} disabled={timeRemaining === "Expirée"}>
              Rejeter
            </Button>
            <Stack variant="subtitle1" flexDirection="row" alignItems="center" justifyContent="center" gap={1}>
              <Typography> Temps restant:  </Typography>
           
             <Chip variant="contained" label={timeRemaining} 
              sx={{ bgcolor: "red", color: "white" }} 
            />  
          </Stack>                  
            
          </>
        )}
  
    </Stack>
  );

  const renderCardHeader = () => {
    let title = "Agent partner";
    let avatarSrc = "";
    let subheader = "Non attribué"; // Valeur par défaut
  
    if (isSender) {
      // Si l'utilisateur est l'expéditeur
      avatarSrc = referral?.receiver?.Profile?.imageUrl || "" || attribution?.received?.Profile?.imageUrl ; 
      subheader = `${referral?.receiver?.firstName || '' || attribution?.received?.firstName } ${referral?.receiver?.lastName || '' || attribution?.received?.lastName} / ${referral?.receiver?.organisation?.toUpperCase() || '' || attribution?.received?.organisation}`;

      if (!isOpen && !isRequested) {
        subheader = `${referral?.receiver?.firstName || ''} ${referral?.receiver?.lastName || ''} / ${referral?.receiver?.organisation?.toUpperCase() || ''}`;
      } 
    } else if (isReceiver || (isOpen && !isSender) ){
      // Si l'utilisateur est le destinataire
      avatarSrc = referral?.sender?.Profile?.imageUrl ||attributedReferral?.sender?.Profile?.imageUrl  ||"";
      subheader = `${referral?.sender?.firstName || ''} ${referral?.sender?.lastName || ''} / ${referral?.sender?.organisation?.toUpperCase() || ''}`;
    } 
    else if (!isReceiver ) {
      avatarSrc = attributedReferral?.sender?.Profile?.imageUrl  ||"";
      subheader = `${attributedReferral?.sender?.firstName || ''} ${attributedReferral?.sender?.lastName || ''} / ${attributedReferral?.sender?.organisation?.toUpperCase() || ''}`;
    }
 
    else {
      // Cas où l'utilisateur n'est ni expéditeur ni destinataire
      subheader = "Non attribué";
    }
    return (
      <> 
      <CardHeader
        avatar={<Avatar aria-label="recipe" sx={{ width: 56, height: 56 }} src={avatarSrc} />}
        title={title}
        subheader={subheader}
      />
  
{isOpen && isSender && request?.status !== "accepted" &&  !isWaitingAttribution &&(
  
    <Stack display="flex" flexDirection="row" gap={1} mt={1}>
      
        
               
        <UserAttributed users = {allUsers} referral={referral}/>
             

             
              
        
        
    </Stack>
)



}
{isWaitingAttribution && (
  <Typography> en attente pour accepter l'attribution</Typography>
)}

    </>
    );
  };

  const renderClientInfo = () => {
    const canViewClientInfo = referral?.status === "mandat" || isSender;
    return (
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Typography variant="h5">Info Client</Typography>
        <Typography variant="subtitle1">Nom : {canViewClientInfo ? referral?.client.nom : "*******"}</Typography>
        <Typography variant="subtitle1">Email : {canViewClientInfo ? referral?.client.email : "*******"}</Typography>
        <Box variant="subtitle1">Télephone : {canViewClientInfo ? referral?.client.telephone : "*******"}</Box>
        {!canViewClientInfo && (
          <Typography>
            Les informations de contact seront fournies après la signature de l'accord de commission.
          </Typography>
        )}
      </CardContent>
    );
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

      <Grid container spacing={2} m={5} >
        <Grid size={6}>
          <Chip
            label={`${referral?.typeDeReferral.charAt(0).toUpperCase()}${referral?.typeDeReferral.slice(1)}`}
            variant="contained"
            sx={{ mt: 4, bgcolor: "secondary.main", color:"white" }}
          />

          <Box component={"div"} sx={{ display: "flex", gap: 1, my: 1 }}>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography variant="subtitle1" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              Lieu : <SlLocationPin />
            </Typography>
            <Typography variant="subtitle1">{referral?.lieu}</Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
          </Box>

          <Divider />
          <Typography variant="h5" paddingTop={2} paddingBottom={2}>
            Information Géneral
          </Typography>

          {renderCardHeader()}

          {isOpen && !isSender && !isRequester &&!isWaitingAttributionReceiver&&(
            <Button variant="contained" onClick={handleRequest}>
              Demander ce referral
            </Button>
          )}
            {isOpen && !isSender &&  filteredRequest?.status == "pending" &&(
            <Button variant="contained" disabled>
            DEMANDE EN ATTENTE 
            </Button>
          )}
           {filteredRequest?.status === "rejected"&& isRequester && isRequested && !isSender &&(
            <Button variant="outlined" color="error" disabled>
            <Typography color="error">demande non attribué </Typography>
            </Button>
          )}

            <Box  mt={5} spacing={2} size={6}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={{ xs: 6 }}>
              <Box color="gray" fontWeight="400">
                Prix du bien
              </Box>
              {referral?.price} €
            </Grid>
          <Grid size={6}>
              <Box color="gray" fontWeight="400">
                Honnoraire
              </Box>
              {referral?.honnoraire} %
            </Grid>
            <Grid size={{ xs: 6 }}>
            <Box color="gray" fontWeight="400">
            Prix du bien
              </Box>
              {referral?.price} €
            </Grid>
            <Grid size={6}>
              <Box color="rgba(0,0,0,0.6)" fontWeight="400">
                Nature du Contact
              </Box>
              {referral?.natureDuContact.charAt(0).toUpperCase() + referral?.natureDuContact.slice(1)}
            </Grid>
            </Grid>
          </Box>  
          
        </Grid>
        

        <Grid size={6}>
          <Card>
            {renderClientInfo()}
            {renderReferralStatus()}
             <Typography variant="caption">
              Publiée le {formatDate(referral?.createdAt)} - Ref : REF{referral?.id.substring(0, 8)}
            </Typography> 
          </Card>
        </Grid>
      </Grid>
 {isRequested && isSender && (
  <> 
  <ReferralRequests referral = {referral} requests= {requests}></ReferralRequests>
  <Divider></Divider>
  
  
  
  </>)}


{filteredRequest?.status == "rejected" && isRequester  ?(
 ""

) :  <Box m={5}>  <StepperComponent requested = {requested} timeRemaining= {timeRemaining} attribution = {attribution} referral = {referral} attributedReferral = {attributedReferral}></StepperComponent> </Box>}
   
   
{isSender && ( <Box sx={{ minWidth: 120, mb: 2 }}>
  <Typography marginTop={6} variant="h6"> Démo étapes suivantes</Typography>
      <FormControl fullWidth>
        <InputLabel id="status-select-label">Statut</InputLabel>
        <Select
          labelId="status-select-label"
          id="status-select"
          onChange={(event) => handleUpdateReferralStatus(event.target.value)}
          defaultValue=""
        >
          <MenuItem value="">
            <em>Choisissez un statut</em>
          </MenuItem>
          <MenuItem value="pourparlers">Pourparlers</MenuItem>
          <MenuItem value="mandat">Mandat</MenuItem>
          <MenuItem value="compromis">Compromis</MenuItem>
          <MenuItem value="act">Act</MenuItem>
        </Select>
      </FormControl>
    </Box>)}
   
    </Container>

  
  );


}

export default Offer;
