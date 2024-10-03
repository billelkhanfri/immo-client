import { Container, Box, Typography } from "@mui/material";


import ResineLogo from "../assets/logo_resine_media.png";


export default function Footer() {
  return (
  
  
   <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 3,
        position: 'relative',
        bottom: 0,
        width: '100%',
        mt:5
       
      }}
    >
      <Container maxWidth="lg" >
        <Typography variant="h6" align="center" gutterBottom>
          Site de Referral
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box variant="body2" align="center" sx={{ display: 'flex', alignItems: 'center' }}>
            Tous droits réservés © 
            <Typography component="span" color=' rgb(131,182,39)' sx={{ mx: 0.5 }}>
              Resine Media
            </Typography> 
            <Box
              component='span'
              sx={{
                height: '60px', // Adjusted size for better fit
                width: '60px', // Adjusted size for better fit
                overflow: 'hidden', // Ensures image does not overflow
                borderRadius: '50%', // Optional: for circular image
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '5px',
              }}
            >
              <img 
                src={ResineLogo} 
                alt="Resine Media Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} // Use 'contain' to maintain aspect ratio
              />
            </Box> 
               {new Date().getFullYear()}
          </Box>
        </Box>
      </Container>
    </Box>

     

  );
}
