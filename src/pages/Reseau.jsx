import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/apiCalls/userApiCall"; 
import UserCard from "../components/UserCard";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Typography } from "@mui/material";

function Reseau() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    dispatch(getAllUsers()); // Appel au thunk pour récupérer les utilisateurs
  }, [dispatch]);

  return (
    <Container>
      <Box mb={2}>
        <Typography variant="h4" fontWeight="600">Liste des Agents</Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 4, md: 4 }} columns={{ xs: 4, sm: 8, md: 16 }}>
          {allUsers && allUsers
            .filter((user) => user.id !== userInfo?.id) 
            .map((user) => (
              <Grid key={user.id} xs={2} sm={4} md={4}>
                <UserCard key={user.id} user={user} />
              </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Reseau;
