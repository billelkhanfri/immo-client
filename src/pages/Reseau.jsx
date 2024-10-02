import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/apiCalls/userApiCall"; 
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, Typography } from "@mui/material";
import Leaflet from "../components/leaflet/Leaflet";
import UserCardMap from "../components/UserCardMap";
import Stack from '@mui/material/Stack';

function Reseau() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    dispatch(getAllUsers()); // Fetch users
  }, [dispatch]);

  const filteredUsers = allUsers?.filter((user) => user.id !== userInfo?.id);
  const addresses = filteredUsers.map((user) => user.address);

  return (
    <Container>
      <Box mb={2}>
        <Typography variant="h4" fontWeight="600">Liste des Agents</Typography>
      </Box>
      
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Leaflet addresses={addresses} />
        </Grid>
        <Grid item xs={4}>
          <Stack
spacing={2}
            sx={{ 
              maxHeight: '900px', // Set the max height for the user card container
              overflowY: 'auto', // Enable vertical scrolling
              border: '1px solid #ccc', // Optional: add a border for visual separation
              padding: 2, // Optional: add padding for better spacing
              display:"flex",
              flexDirection:"column",
            
            }}
          >
            {filteredUsers.length === 0 ? (
              <Typography variant="h6">Aucun agent trouvé</Typography>
            ) : (
              filteredUsers.map((user) => (
                <Stack key={user.id} >
                  <UserCardMap user={user} />
                </Stack>
              ))
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Reseau;
