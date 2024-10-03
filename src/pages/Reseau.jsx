import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/apiCalls/userApiCall"; 
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, Typography, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import Leaflet from "../components/leaflet/Leaflet";
import UserCardMap from "../components/UserCardMap";
import UserCard from "../components/UserCard"; // Import your UserCard component
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const cities = [
  "Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg",
  "Montpellier", "Bordeaux", "Lille", "Rennes", "Reims", "Saint-Étienne",
  "Le Havre", "Ghent", "Grenoble", "Dijon", "Nîmes", "Aix-en-Provence",
  "Angers", "Villeurbanne" ,"Toulon"
];

function Reseau() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [selectedCity, setSelectedCity] = useState("");
  const [showMap, setShowMap] = useState("list"); 
  useEffect(() => {
    dispatch(getAllUsers()); // Fetch users
  }, [dispatch]);

  const filteredUsers = allUsers?.filter((user) => 
    user.id !== userInfo?.id && 
    (selectedCity ? user.address.city === selectedCity : "map") // Filter by city if selected
  );

  const addresses = filteredUsers.map((user) => user.address);

  const handleChange = (event, newAlignment) => {
   setShowMap(newAlignment);
  };

  return (
    <Container>
      <Box mb={2}>
        <Typography variant="h4" fontWeight="600">Liste des Agents</Typography>
      </Box>
      
      <Stack direction="row" spacing={2} alignItems="center" mb={2} justifyContent="space-between">
        <FormControl variant="outlined" margin="normal" size="small" sx={{ width: '300px' }}>
          <InputLabel id="city-select-label">Trouvez un agent</InputLabel>
          <Select
            labelId="city-select-label"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            label="Trouvez un agent"
          >
            <MenuItem value=""><em>Choisir une ville</em></MenuItem>
            {cities.map((city) => (
              <MenuItem key={city} value={city}>{city}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <ToggleButtonGroup
      color="primary"
      value={showMap}
      exclusive
      size="small" 
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="list">List</ToggleButton>
      <ToggleButton value="map">Carte</ToggleButton>
     
    </ToggleButtonGroup>
      </Stack>
{showMap === "map"? (<Grid container spacing={2}>
        <Grid item xs={8}>
          <Leaflet addresses={addresses} />
        </Grid>
        <Grid item xs={4}>
          <Stack
            spacing={2}
            sx={{ 
              maxHeight: '900px',
              overflowY: 'auto',
              border: '1px solid #ccc',
              padding: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {filteredUsers.length === 0 ? (
              <Typography variant="h6">Aucun agent trouvé</Typography>
            ) : (
              filteredUsers.map((user) => (
                <Stack key={user.id}>
                  <UserCardMap user={user} />
                </Stack>
              ))
            )}
          </Stack>
        </Grid>
      </Grid>) : (

<Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" fontWeight="600" gutterBottom>
        Liste des Agents
      </Typography>
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 16 }}>
        {allUsers && allUsers
          .filter((user) => user.id !== userInfo?.id)
          .map((user) => (
            <Grid item key={user.id} xs={2} sm={4} md={4}>
              <UserCard user={user} />
            </Grid>
          ))}
      </Grid>
    </Box>




      )}
      
    </Container>
  );
}

export default Reseau;
