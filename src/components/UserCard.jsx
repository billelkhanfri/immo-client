import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box} from '@mui/material';
import Divider from '@mui/material/Divider';
import {Link} from 'react-router-dom'
function UserCard({ user }) {
  const date = new Date(user.createdAt);
  const dateFormat = Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
  }).format(date);

  return (
    <>
      <Card sx={{ maxWidth: 345, height: 450, display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" flexDirection="column" flex="1">
     <Link
                      to={`/mon-profil/${user.id}`}> 
          <Box display="flex" alignItems="center" justifyContent="center" padding="16px">
            <Avatar
              alt="Remy Sharp"
              src={user.Profile.imageUrl}
              sx={{ width: 140, height: 140 }}
            />
          </Box>
          <Divider variant="middle" />
          <CardHeader
          
            title={`${user.firstName} ${user.lastName}`}
            titleTypographyProps={{
              variant: 'h6', 
              style: {
                fontSize: '1.2rem', 
                fontWeight: 'bold', 
                color: '#333', 
              },
            }}
            subheader={`Membre : ${dateFormat}`}
          />
          <Divider variant="middle" />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Secteur : {user.secteur}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Organisation : {user.organisation}
            </Typography>
          </CardContent>
          </Link>
          <Link   to={`/creer-une-offre/${user.id}`}> 
          <Box sx={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
         
            <Button variant="contained" size="small">Envoyer un referral</Button>
          </Box>
          </Link>
        </Box>
      </Card>
    </>
  );
}

export default UserCard;
