import {useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import {getAllReferrals} from "../redux/apiCalls/referralApiCall"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Container, Typography } from "@mui/material";
import ReferralCard from "../components/ReferralCard"

function Referrals() {
    const dispatch = useDispatch();
    const referrals = useSelector((state)=> state.referrals.referrals)


    useEffect(()=> {
        dispatch(getAllReferrals());
    }, [dispatch])
  return (
   
    <Container>
    <Box mb={2}>   
         <Typography variant = "h4" fontWeight="600">Les Referrals ouverts</Typography>
    </Box>
  <Box sx={{ flexGrow: 1 }}>
  <Grid container spacing={{ xs: 4, md: 4 }} columns={{ xs: 4, sm: 8, md: 16 }}>

    {referrals &&referrals.map((referral) => (
                <Grid key= {referral.id} xs={2} sm={4} md={4}>

      <ReferralCard key= {referral.id} referral= {referral}/>
      </Grid>

    ))}
      </Grid>
      </Box>
      </Container>
  )
}

export default Referrals