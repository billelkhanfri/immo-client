import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import {Link} from 'react-router-dom'

function ReferralCard({referral}) {
    const date = new Date(referral.createdAt);
    const dateFormat = Intl.DateTimeFormat("fr-FR", {
      dateStyle: "short",
    }).format(date);
  return (
    <Card sx={{ maxWidth: 345,  display: 'flex', flexDirection: 'column' }}>
                <Box display="flex" flexDirection="column" flex="1">

<CardContent  sx={{bgcolor:"rgba(0, 0, 0, 0.062)"}}
>
<Typography gutterBottom variant="h5" component="div" fontWeight="600">
        
   Referral { `${referral.typeDeReferral}`.charAt(0).toUpperCase() +referral.typeDeReferral.slice(1)}
    </Typography>
    <Typography gutterBottom variant="body2" component="div" color="text.secondary">
        
    Contact : { `${referral.natureDuContact}`}
    </Typography>
    
   
    <Typography gutterBottom variant="body2" component="div" color="text.secondary">
        
   Lieu :  { `${referral.lieu}`.charAt(0).toUpperCase() +referral.lieu.slice(1)}
    </Typography>
    <Typography gutterBottom variant="body2" component="div"  color="text.secondary">
        
        Prix : { `${referral.price}`} €
        </Typography>

    </CardContent>
    <Divider></Divider>
    <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="body2" color="text.secondary">
          A la recherche d'un agent aux alentoures de   { `${referral.lieu}`.charAt(0).toUpperCase() +referral.lieu.slice(1)}
            </Typography>
          
            <Typography variant="body2" color="text.secondary">
{dateFormat}            </Typography>

          <Divider></Divider>
          <CardHeader
        avatar={
          <Avatar  aria-label="recipe" src ={referral.sender.Profile.imageUrl}>
        
          </Avatar>
        }
      
        title={referral.sender.firstName +" "  + referral.sender.lastName} 
        subheader = {referral.sender.organisation}
       
      />
          </CardContent>



          <Box sx={{ padding: '16px', display: 'flex', justifyContent: 'right' }}>
  {referral?.status !== "envoyé" && referral?.status !== "rejeté" ? (
    <Button variant="contained" disabled size="small">{referral?.status}</Button>
  ) : (
    <Link to={`/offre/${referral.id}`}>
      <Button variant="contained" size="small">Voir</Button>
    </Link>
  )}
</Box>




                </Box>

</Card>
  )
}

export default ReferralCard