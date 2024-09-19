import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useParams } from "react-router-dom";
import { attributeReferral } from "../redux/apiCalls/referralApiCall";

function UserAttributed({ users, referral }) {
  const { id } = useParams();  // Récupérer l'ID du referral
  const dispatch = useDispatch();
const userInfo = JSON.parse(localStorage.getItem('userInfo'))
const handleSelectedValue = (event, value) => {
  if (value) {
    dispatch(attributeReferral(id, value.id)); 
  }
};


  const otherUsers = users.filter((u) => u.id !== userInfo.id)

  return (
    <Autocomplete
      id="users"
      sx={{ width: 300 }}
      options={otherUsers}
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
