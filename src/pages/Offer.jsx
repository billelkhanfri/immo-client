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
  Grid,
  Stack,
  Chip,
  Avatar,
  CardHeader,
} from "@mui/material";
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
    await dispatch(updateReferralStatus(id, "rejected"));
    await dispatch(getReferral(id)); 
  };
  const handleAccept = async () => {
    await dispatch(updateReferralStatus(id, "attribue"));
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
      <Stack direction="row" gap={1} alignItems="center">
        <Typography variant="subtitle1">Status:</Typography>
        <Chip
          label={referral?.status.charAt(0).toUpperCase() + referral?.status.slice(1)}
          variant="contained"
          sx={{
            bgcolor: referral?.status === "rejected" ? "red" : "primary.main",
            color: "white",
          }}
        />
      </Stack>

      {referral?.status === "pending" && (
        isSender ? (
          <Typography variant="subtitle1">Temps restant: {timeRemaining}</Typography>
        ) : (
          <>
            <Button variant="contained" onClick={handleAccept} disabled={timeRemaining === "Expirée"}>
              Accepter
            </Button>
            <Button variant="outlined" color="error" onClick={handleReject} disabled={timeRemaining === "Expirée"}>
              Rejeter
            </Button>
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
  );

  const renderCardHeader = () => {
    let title = "Agent partner";
    let avatarSrc = "";
    let subheader = "Non attribué";

    if (isSender) {
      avatarSrc = referral?.receiver?.Profile?.imageUrl || "" ||request?.requester?.Profile.imageUrl ;
      subheader = isOpen && !isRequested ? <Button variant="contained">Ajouter un récepteur</Button> :  ` ${request?.requester?.firstName} ${request?.requester?.lastName} / ${request?.requester?.organisation?.toUpperCase()}` ;
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
                    disabled={timeRemaining === "Expirée"}
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
                    disabled={timeRemaining === "Expirée"}
                >
                    Rejeter
                </Button>
            </>
        )}
    </Stack>
)}

     
    </>
    );
  };

  const renderClientInfo = () => {
    const canViewClientInfo = referral?.status === "mondat" || isSender;
    return (
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Typography variant="h5">Info Client</Typography>
        <Typography variant="subtitle1">Nom : {canViewClientInfo ? referral?.client.nom : "*******"}</Typography>
        <Typography variant="subtitle1">Email : {canViewClientInfo ? referral?.client.email : "*******"}</Typography>
        <Typography variant="subtitle1">Télephone : {canViewClientInfo ? referral?.client.telephone : "*******"}</Typography>
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

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Chip
            label={`${referral?.typeDeReferral.charAt(0).toUpperCase()}${referral?.typeDeReferral.slice(1)}`}
            variant="contained"
            sx={{ mt: 4, bgcolor: "secondary.main", color:"white" }}
          />

          <Typography component={"div"} sx={{ display: "flex", gap: 1, my: 1 }}>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography variant="subtitle1" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              Lieu : <SlLocationPin />
            </Typography>
            <Typography variant="subtitle1">{referral?.lieu}</Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
          </Typography>

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

          <Grid>
            <Grid padding="16px">
              <Typography color="rgba(0,0,0,0.6)" fontWeight="600">
                Honnoraire
              </Typography>
              <Typography>{referral?.honnoraire} %</Typography>
            </Grid>
            <Grid padding="16px">
              <Typography color="rgba(0,0,0,0.6)" fontWeight="600">
                Prix du bien
              </Typography>
              <Typography>{referral?.price} €</Typography>
            </Grid>
            <Grid padding="16px">
              <Typography color="rgba(0,0,0,0.6)" fontWeight="600">
                Nature du Contact
              </Typography>
              <Typography>{referral?.natureDuContact.charAt(0).toUpperCase() + referral?.natureDuContact.slice(1)}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Card>
            {renderClientInfo()}
            {renderReferralStatus()}
            <Typography variant="caption">
              Publiée le {formatDate(referral?.createdAt)} - Ref : REF{referral?.id.substring(0, 8)}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <StepperComponent referral = {referral}></StepperComponent>
    </Container>
  );
}

export default Offer;
