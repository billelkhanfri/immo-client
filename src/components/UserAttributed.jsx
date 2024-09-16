import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useParams } from "react-router-dom";
import { updateReferral } from "../redux/apiCalls/referralApiCall";

function UserAttributed({ users, referral }) {
  const { id } = useParams();  // Récupérer l'ID du referral
  const dispatch = useDispatch();

  // Fonction appelée lorsque l'utilisateur sélectionne une valeur
  const handleSelectedValue = (event, value) => {
    if (value) {  // Si une valeur est sélectionnée
      console.log(value);

      // Créer une copie de l'objet referral pour ne pas le muter directement
      const updatedReferral = { ...referral, receiverId: value.id };

      // Mettre à jour le referral avec le dispatch
      dispatch(updateReferral(id, updatedReferral));
    }
  };

  return (
    <Autocomplete
      id="users"
      sx={{ width: 300 }}
      options={users}
      autoHighlight
      getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
      onChange={handleSelectedValue}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;

        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            {option.Profile?.imageUrl && (
              <img
                loading="lazy"
                width="20"
                srcSet={option.Profile.imageUrl}
                src={option.Profile.imageUrl}
                alt=""
              />
            )}
            {option.firstName} {option.lastName} ({option.telephone})
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Chercher un Agent"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', 
          }}
        />
      )}
    />
  );
}

export default UserAttributed;
