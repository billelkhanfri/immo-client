import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/apiCalls/userApiCall"; 
import UserCard from "../components/UserCard";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

function Reseau() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers);
  console.log(allUsers)

  useEffect(() => {
    dispatch(getAllUsers()); // Appel au thunk pour récupérer les utilisateurs
  }, [dispatch]);

  return (
    <div>
      <h2>Liste des Agents</h2>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

        {allUsers &&allUsers.map((user) => (
                    <Grid xs={2} sm={4} md={4}>

          <UserCard user= {user}/>
          </Grid>

        ))}
          </Grid>
          </Box>
      
    </div>
  );
}

export default Reseau;
