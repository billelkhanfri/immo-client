import { Link , useParams} from 'react-router-dom';
import { Alert, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { verifyEmail } from '../../redux/apiCalls/authApiCall';

function VerifyEmail() {
    const dispatch = useDispatch()
    const {isEmailVerified} = useSelector((state)=> state.auth)
    const {userId, token} = useParams()

useEffect(()=> {
   dispatch(verifyEmail(userId,token))
},[userId, token])
    return (
        <Box sx={{ p: 2 }}>
            {isEmailVerified ? (
                <>
                    <Alert severity="success">Votre email est vérifié. Merci !</Alert>
                    <Box mt={2}>
                        <Button variant="contained" component={Link} to="/se-connecter" color="primary">
                            Aller à la page d'accueil
                        </Button>
                    </Box>
                </>
            ) : (
                <>
                    <Alert severity="warning">
                        Votre email n'est pas encore vérifié. Veuillez vérifier votre boîte de réception.
                    </Alert>
                    <Box mt={2}>
                        <Button variant="contained" color="primary">
                            Renvoyer l'email de vérification
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default VerifyEmail;
