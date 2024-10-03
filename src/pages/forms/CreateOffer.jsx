import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, TextField, Button, Box, FormLabel,  FormControl,
  FormHelperText,

  RadioGroup,
  FormControlLabel, Stack,
  Radio, } from "@mui/material";
  import Slider from '@mui/material/Slider';
import { createReferral } from "../../redux/apiCalls/referralApiCall";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {getUserByID} from "../../redux/apiCalls/userApiCall";
import {useEffect,useState} from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';




const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 20,
    label: '20%',
  },
  {
    value: 35,
    label: '35%',
  },
  {
    value: 50,
    label: '50%',
  },
];
function CreateOffer() {
  const navigate = useNavigate();
  const {id} =  useParams()
  const dispatch = useDispatch();
  const {userByID} = useSelector((state)=> state.user)
  const [nature, setNature] = useState("direct")

useEffect(()=> {
  if (id){ dispatch(getUserByID(id));
  }
 
},[id, dispatch])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();


  const onSubmit = (data) => {
    const { clientNom, clientEmail, clientTelephone,nature, ...referralData } = data;

    // Construct clientInfo object
    referralData.clientInfo = {
      nom: clientNom,
      email: clientEmail,
      telephone: clientTelephone,
    };
    referralData.naturDuContact = nature
  // Add the receiverId to the referralData
  referralData.receiverId = id;
    dispatch(createReferral(referralData));
    navigate("/mes-offres");
  };

  return (
    <Container sx={{ backgroundColor: "#FFFFFF", borderRadius: 2, padding: 2 }}>
      
    
      {id && userByID?.user?.id === id && (
        <Box  sx = {{backgroundColor:"primary.main", border:1,  mt: 4,
          mx: "auto",
          textAlign: "center",
          color: "primary.main",
          maxWidth: "30rem",
          width: "90%",
          padding:"8px",
          marginY: 2,}}> 
        <Typography
          variant="h6"
          sx={{ mx: 4, textAlign: "center", color: "#fff" }}
        >
          Agent receveur : {userByID.user.firstName} {userByID.user.lastName}
        </Typography>
        </Box>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          mt: 4,
          mx: "auto",
          textAlign: "center",
          color: "primary.main",
          maxWidth: "30rem",
          width: "90%",
          marginY: 2,
        }}
      >
           <FormLabel component= "legend" sx ={{mb:1 ,textAlign:"left", fontWeight:"bold"}}> 
              Type de Referral
            </FormLabel>
        {/* ToggleButtonGroup for Type de Referral */}
        <Controller
          name="typeDeReferral"
          control={control}
          defaultValue="" // Default value for the ToggleButtonGroup
          rules={{ required: "Type de Referral is required" }} // Validation rules
          render={({ field }) => (
         
            <ToggleButtonGroup
            fullWidth
            label = "type de referral"
              color="secondary"
              value={field.value}
              exclusive
              onChange={(event, newValue) => {
                field.onChange(newValue); // Update form value
              }}
              aria-label="Type de Referral"
              sx={{ mb: 2 }}
            >
              <ToggleButton  value="vendeur">Vendeur</ToggleButton>
              <ToggleButton value="acheteur">Acheteur</ToggleButton>
            </ToggleButtonGroup>
          )}
        />
        {errors.typeDeReferral && (
          <Typography variant="body2" color="error">
            {errors.typeDeReferral.message}
          </Typography>
        )}
           <FormLabel component= "legend" sx ={{mb:1 ,textAlign:"left", fontWeight:"bold"}}> 
              Nature du Contact
            </FormLabel>
        <FormControl fullWidth  row = "true"  sx={{ mb: 2 }}>
     
            <Controller
              name="natureDuContact"
              control={control}
              defaultValue="direct"
              render={({ field }) => (
                <RadioGroup
                

                  {...field}
                  value={nature} // Set the value to the state
                  onChange={(e) => {
                    setNature(e.target.value); // Update the state on change
                    field.onChange(e.target.value); // Trigger the field change
                  
                  }}
                >
                  <FormControlLabel
                    value="direct"
                    control={<Radio />}
                    label="Direct"
                    
                  />
                  <FormControlLabel
                    value="indirect"
                    control={<Radio />}
                    label="Indirect"
                  />
                </RadioGroup>
              )}
            />
            <FormHelperText error>
              {errors.natureDuContact && errors.natureDuContact.message}
            </FormHelperText>
          </FormControl>
     

   
      <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 2 }}> 
        <TextField
        
          label="Lieu"
          {...register("lieu", { required: true })}
          error={!!errors.lieu}
          helperText={errors.lieu ? "Lieu is required" : ""}
        
        />
         <TextField
       
          label="Prix du bien"
          type="number"
          {...register("price", { required: true })}
          error={!!errors.price}
          helperText={errors.price ? "Price is required" : ""}
         
        />
      
        </Stack>
        <FormLabel component= "legend" sx ={{mb:1 ,textAlign:"left", fontWeight:"bold"}}> 
           Honnoraire
            </FormLabel>
        <Controller
  name="honnoraire"
  control={control}
  defaultValue={5} // Set a default value
  rules={{ required: "Honnoraire is required" }}
  render={({ field }) => (
    <Slider
      {...field}
      aria-label="Custom marks"
      value={field.value || 20} // Use the field value or a default
      onChange={(_, value) => field.onChange(value)} // Update the field value on change
      valueLabelDisplay="auto"
      marks={marks}
      sx={{ mb: 4 }}
    />
  )}
/>
{errors.honnoraire && (
  <Typography variant="body2" color="error">
    {errors.honnoraire.message}
  </Typography>
)}

      

<TextField
fullWidth
  label="Commentaire"
  {...register("commentaire", { required: false })}
  error={!!errors.commentaire}
  helperText={errors.commentaire ? "Commentaire is required" : ""}
  multiline
  rows={2} // Adjust the number of rows (lines) visible in the textarea
  sx={{ mb: 2 }}
/>

        {/* New Client Information Fields */}
        <TextField
          fullWidth
          label="Nom du Client"
          {...register("clientNom", { required: true })}
          error={!!errors.clientNom}
          helperText={errors.clientNom ? "Nom du Client is required" : ""}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email du Client"
          type="email"
          {...register("clientEmail", { required: true })}
          error={!!errors.clientEmail}
          helperText={errors.clientEmail ? "Email du Client is required" : ""}
          sx={{ mb: 2 }}
        />
      <TextField
  fullWidth
  label="Téléphone du Client"
  type="tel"
  {...register("clientTelephone", {
    required: "Numéro de téléphone est requis",
    pattern: {
      value: /^[0-9]+$/,
      message: "Veuillez entrer un numéro de téléphone valide",
    },
  })}
  error={!!errors.clientTelephone}
  helperText={errors.clientTelephone ? errors.clientTelephone.message : ""}
  sx={{ mb: 2 }}
  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
/>


     
    

        <Button
          type="submit"
          // variant="contained"
         
       
          sx={{ mt: 2, backgroundColor:"secondary.main" , color:"#fff"}}

        >
          Créer un Referral
        </Button>
      </Box>
    </Container>
  );
}

export default CreateOffer;
