import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
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
import { createReferralRequest, getAllRequests,getRequest, updateRequestStatus } from "../redux/apiCalls/requestApiCall";
import StepperComponent from "../components/Stepper";

function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid Date";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function Offer() {
 
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { referral } = useSelector((state) => state.referrals);
  const {request, requests} = useSelector((state)=> state.requests)
  const isSender = referral?.senderId === userInfo.id;
  const isReceiver = referral?.receiverId === userInfo.id;
  const isOpen = referral?.receiverId === null;
   const isRequested = request?.referralId === id
  const [timeRemaining, setTimeRemaining] = useState("");
  const [requestStatus, setRequestStatus] = useState(request?.status);
 

  useEffect(() => {
    dispatch(getReferral(id));
    dispatch(getRequest(id))
  
  }, [dispatch, id]);

  // Re-fetch request when its status changes
  useEffect(() => {
    if (request?.status) {
      dispatch(getRequest(id)); // Fetch updated request after status change
      dispatch(getReferral(id));
     
    }
  }, [dispatch, id, request?.status]);
  useEffect(() => {
    if (referral?.createdAt) {
      const createdAtDate = new Date(referral.createdAt);
      const countdownDate = new Date(createdAtDate.getTime() + 24 * 60 * 60 * 1000);
  
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
    await dispatch(updateReferralStatus(id, "rejeté"));
    await dispatch(getReferral(id)); 
  };
  const handleAccept = async () => {
    await dispatch(updateReferralStatus(id, "attribué"));
    await dispatch(getReferral(id)); // Ensure the state is updated and fetched

 };
 
  

  const handleAcceptRequest =  async() => {
    await dispatch(updateRequestStatus(request?.id, "accepted"));
    await dispatch(getRequest(id)); // Fetch updated request after referral request



  };

  const handleRejectRequest = () => {
    dispatch(updateRequestStatus(request?.id, "rejected"));
   
  };

 

  const renderReferralStatus = () => (
    <Stack spacing={isSender ? 1 : 2} direction={isSender ? "row" : "column"}>
    

      {referral?.status === "en attente" && (
        isSender ? (
          <Box variant="subtitle1">Temps restant:{timeRemaining}</Box>
        ) : (
          <>
            <Button variant="contained" onClick={handleAccept} disabled={timeRemaining === "Expirée"}>
              Accepter
            </Button>
            <Button variant="outlined" color="error" onClick={handleReject} disabled={timeRemaining === "Expirée"}>
              Rejeter
            </Button>
            <Box variant="subtitle1">
            Temps restant: 
            {/* <Chip variant="contained" label={timeRemaining} 
              sx={{ bgcolor: "red", color: "white" }} 
            />  */}
          </Box>                  
            
          </>
        )
      )}
    </Stack>
  );

  const renderCardHeader = () => {
    let title = "Agent partner";
    let avatarSrc = "";
    let subheader = "Non attribué";

    if (isSender) {
      avatarSrc = referral?.receiver?.Profile?.imageUrl || "" ||request?.requester?.Profile.imageUrl ;
      subheader = isOpen && !isRequested ? subheader :  ` ${request?.requester?.firstName} ${request?.requester?.lastName} / ${request?.requester?.organisation?.toUpperCase()}` ;
    } else if (isReceiver || isOpen) {
      avatarSrc = referral?.sender?.Profile?.imageUrl || "";
      subheader = `${referral?.sender?.firstName} ${referral?.sender?.lastName} / ${referral?.sender?.organisation?.toUpperCase()}`;
    }

    return (
      <> 
      <CardHeader
        avatar={<Avatar aria-label="recipe" sx={{ width: 56, height: 56 }} src={avatarSrc} />}
        title={title}
        subheader={subheader}
      />
      {isOpen && isSender && isRequested && (
    <Stack display="flex" flexDirection="row" gap={1} mt={1}>
        {requestStatus === "accepted" ? (
            <Typography variant="body1" color="success.main">
              Le referral a été attribué avec succès.
            </Typography>
        ) : requestStatus === "rejected" ? (
            <Typography variant="body1" color="error.main">
                referral rejeté.
            </Typography>
        ) : (
            <>
                <Button
                    variant="contained"
                    onClick={() => {
                        handleAcceptRequest();
                        setRequestStatus("accepted");
                       
                    }}
                >
                    Accepter
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                        handleRejectRequest();
                        setRequestStatus("rejected");
                    }}
                >
                    Rejeter
                </Button>
            </>
        )}
    </Stack>
)



}
{isOpen && isSender && !isRequested && (
    <Stack display="flex" flexDirection="row" gap={1} mt={1}>
        {requestStatus === "accepted" ? (
            <Typography variant="body1" color="success.main">
              Le referral a été attribué avec succès.
            </Typography>
        ) : requestStatus === "rejected" ? (
            <Typography variant="body1" color="error.main">
                referral rejeté.
            </Typography>
        ) : (
            <>
                <Button
                    variant="contained"
                    onClick={() => {
                        handleAcceptRequest();
                        setRequestStatus("accepted");
                       
                    }}
                    
                >
                 Envoyer à un agent
                </Button>
              
            </>
        )}
    </Stack>
)



}

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

          {isOpen && !isSender && !isRequested && (
            <Button variant="contained" onClick={handleRequest}>
              Demander ce referral
            </Button>
          )}
            {isOpen && !isSender && isRequested  &&(
            <Button variant="contained" disabled>
            DEMANDE EN ATTENTE 
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
            {/* <Typography variant="caption">
              Publiée le {formatDate(referral?.createdAt)} - Ref : REF{referral?.id.substring(0, 8)}
            </Typography> */}
          </Card>
        </Grid>
      </Grid>

<Divider></Divider>
<Box m={5}>  <StepperComponent referral = {referral}></StepperComponent> </Box>
    
    </Container>
  );
}

export default Offer;
