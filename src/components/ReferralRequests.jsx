import { useDispatch } from "react-redux";
import {  useParams } from "react-router-dom";
import {

    Button,
  
  Box,
    Stack,
    Chip,
    Avatar,
    CardHeader,
  } from "@mui/material";
  import { getReferral } from "../redux/apiCalls/referralApiCall";
  import { getRequest, getAllRequests, updateRequestStatus } from "../redux/apiCalls/requestApiCall";
  import { styled } from '@mui/material/styles';
  import Paper from '@mui/material/Paper';
  import Grid from '@mui/material/Grid2';



  function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date";
  
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));



  
function ReferralRequests({referral,requests}) {



    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { id } = useParams();
    const dispatch = useDispatch();
    const isSender = referral?.senderId === userInfo.id;
   

const filterRequests =  requests?.filter((req) => req?.referralId === id)
    
    
  return (

 
    <Box>
    {isSender &&   (
      <Grid container spacing={2}>

       
         {filterRequests?.map((req, index) => ( 
            <> 
        <Grid size={12}>
        <Item sx={{display:"flex"}}>
        <Grid size={3}sx={{display:"flex", justifyContent:"center"}} >
        <CardHeader
        avatar={<Avatar aria-label="recipe" sx={{ width: 32, height: 32 }} src={req?.requester.Profile.imageUrl} />}
        title={req?.requester.firstName +" "+ req?.requester.lastName}
     
      />
              </Grid>
              <Grid size={3}sx={{display:"flex", alignItems:"center" , justifyContent:"center"}} >
              {formatDate(req?.createdAt)}
              </Grid>
             
              <Grid size={6}sx={{display:"flex", alignItems:"center" , justifyContent:"flex-end"}} >
              <Stack display="flex" flexDirection="row" gap={5} >
        {req?.referral.status === "attribué" && req?.status === "accepted" ? (
          
               <Chip variant="contained" label= "Attribué "
               sx={{ bgcolor: "green", color: "white" ,width : "75px"}} 
             /> 
        ) :   req?.status === "rejected" ?(
          <Chip variant="contained" label= "Rejeté "
          sx={{ bgcolor: "red", color: "white" ,width : "75px" }} 
        />
        ) : (
            <>
               <Button
  variant="contained"
  disabled={req?.referral.status === "attribué" } // Correctly using 'disabled' prop
  onClick={async () => {
    await dispatch(updateRequestStatus(req?.id, "accepted"));
     // Rejet des autres requêtes
  const otherRequests = requests.filter((re) => re.id !== req?.id);
  otherRequests.forEach(async (req) => {
    await dispatch(updateRequestStatus(req.id, "rejected"));
  });
    await dispatch(getRequest(id));
    await dispatch(getReferral(id)); // Mets à jour le referral
    await dispatch(getAllRequests()); // Mets à jour les requêtes // Fetch updated request after referral request
  }}
>
  Accepter
</Button>

                <Button
                    variant="outlined"
                    disabled={req?.referral.status === "attribué" } // Correctly using 'disabled' prop

                    color="error"
                    onClick={ async () => {
                        await dispatch(updateRequestStatus(req?.id, "rejected"));

                    }}
                >
                    Rejeter
                </Button>
            </>
        )}
    </Stack>
              </Grid>
            </Item>
          </Grid>
          </>
         ))} 
      </Grid>
    )}
  </Box>
  
      );
  
}



export default ReferralRequests