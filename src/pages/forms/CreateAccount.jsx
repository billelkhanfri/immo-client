import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import  { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import cpiData from "../../assets/MOCK_DATA.json";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert";
import { authActions } from "../../redux/slices/authSlice"; // Import the actions
import { ToastContainer } from "react-toastify";


function CreateAccount() {
  const dispatch = useDispatch();
  const { registerMessage } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");

  function handleCPI(cpiUser) {
    const cpiFound = cpiData.find((e) => e.cpi === cpiUser);
    if (!cpiFound) {
      return "Ce CPI n'est pas valide";
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (formData) => {
    const {
      firstName,
      lastName,
      email,
      password,
      cpi,
      secteur,
      organisation,
      telephone,
      termsAccepted,
      address, // Expecting an address object
    } = formData;
  
    // Structure the address object
    const addressData = {
      street: address?.street,
      city: address?.city,
      region: address?.region,
      postalCode: address?.postalCode,
      country: address?.country,
    };
  
    dispatch(
      registerUser({
        firstName,
        lastName,
        email,
        password,
        cpi,
        secteur,
        organisation,
        telephone,
        termsAccepted,
        address: addressData, // Send address as an object
      })
    );
  };
  
  const navigate = useNavigate();

  useEffect(() => {
    if (registerMessage) {
      swal({
        title: registerMessage,
        icon: "success",
      }).then((isOk) => {
        dispatch(authActions.clearRegisterMessage()); // Clear the register message
        navigate("/se-connecter");
      });
    }
  }, [registerMessage]);

  return (
    <Container
      sx={{ backgroundColor: "#FFFFFF", borderRadius: 2, padding: 2 }}
    >
      <ToastContainer />
      <Typography
        variant="h2"
        sx={{ mx: 4, textAlign: "center", color: "primary.main" }}
      >
        S'inscrire
      </Typography>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        {/* Medium Screen Form */}
        <Typography
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: { xs: 0, sm: 8 },
          }}
          component={"div"}
        >
          <Stack
            spacing={2}
            sx={{
              display: "flex",
              textAlign: "center",
              color: "primary.main",
              maxWidth: "30rem",
              width: "90%",
              marginY: 2,
            }}
          >
            <TextField
              label="Nom"
              type="text"
              required
              error={!!errors.lastName}
              helperText={errors.lastName && errors.lastName.message}
              {...register("lastName", {
                required: "Ce champ est obligatoire.",
                minLength: {
                  value: 3,
                  message: "Votre nom doit contenir au moins 3 caractères.",
                },
                maxLength: {
                  value: 20,
                  message: "Votre nom ne peux contenir plus de 20 caractères.",
                },
              })}
            />
            <TextField
              label="Adresse e-mail"
              type="email"
              required
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
              {...register("email", {
                required: "Ce champ est obligatoire.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Veillez entrer une adresse email valide.",
                },
              })}
            >
              <FormHelperText error>{error.errorEmail}</FormHelperText>
            </TextField>
            <TextField
              label="Confirmer l'adresse e-mail"
              type="text"
              required
              error={!!errors.confirmEmail}
              helperText={errors.confirmEmail && errors.confirmEmail.message}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              {...register("confirmEmail", {
                required: "Ce champ est obligatoire.",
                validate: (emailValue) => {
                  if (watch("email") != emailValue) {
                    return "L'adresse e-mail ne correspond pas";
                  }
                },
              })}
            />

            <TextField
              label="Téléphone"
              type="string"
              required
              error={!!errors.telephone}
              helperText={errors.telephone && errors.telephone.message}
              {...register("telephone", {
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Veuillez entrer un numéro de téléphone valide",
                },
                required: "Ce champ est obligatoire.",
                minLength: {
                  value: 10,
                  message:
                    "Votre téléphone doit contenir au moins 10 caractères.",
                },
                maxLength: {
                  value: 10,
                  message:
                    "Votre téléphone ne peux contenir plus de 10 caractères.",
                },
              })}
            />
            <TextField
              label="Secteur"
              type="text"
              required
              error={!!errors.secteur}
              helperText={errors.secteur && errors.secteur.message}
              {...register("secteur", {
                required: "Ce champ est obligatoire.",
              })}
            />
          </Stack>
          <Stack
            spacing={2}
            sx={{
              display: "flex",
              textAlign: "center",
              color: "primary.main",
              maxWidth: "30rem",
              width: "90%",
              marginY: 2,
            }}
          >
            <TextField
              label="Prénom"
              type="text"
              required
              error={!!errors.firstName}
              helperText={errors.firstName && errors.firstName.message}
              {...register("firstName", {
                required: "Ce champ est obligatoire.",
                minLength: {
                  value: 3,
                  message: "Votre prénom doit contenir au moins 3 caractères.",
                },
                maxLength: {
                  value: 20,
                  message:
                    "Votre prénom ne peux contenir plus de 20 caractères.",
                },
              })}
            />
            <TextField
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              required
              error={!!errors.password}
              helperText={errors.password && errors.password.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("password", {
                required: "Ce champ est obligatoire.",
                minLength: {
                  value: 8,
                  message:
                    "Le mot de passe doit comporter au minimum 8 caractères.",
                },
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
                  message:
                    "Le mot de passe doit comprendre au minimum une majuscule, une minuscule, un chiffre et un caractère spéciale",
                },
              })}
            />
            <TextField
              label="Confirmer le mot de passe"
              type="password"
              required
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword && errors.confirmPassword.message
              }
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              {...register("confirmPassword", {
                required: "Ce champ est obligatoire.",
                validate: (passwordValue) => {
                  if (watch("password") != passwordValue) {
                    return "Le mot de passe ne correspond pas";
                  }
                },
              })}
            />{" "}
            <TextField
              label="CPI"
              type="text"
              required
              error={!!errors.cpi}
              helperText={errors.cpi && errors.cpi.message}
              {...register("cpi", {
                required: "Ce champ est obligatoire.",
                validate: handleCPI,
              })}
            >
              <FormHelperText>{error.errorCpi}</FormHelperText>
            </TextField>
            <TextField
              label="Organisation"
              type="text"
              required
              error={!!errors.organisation}
              helperText={errors.organisation && errors.organisation.message}
              {...register("organisation", {
                required: "Ce champ est obligatoire.",
              })}
            />
          </Stack>
        </Typography>
        <Stack
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            color: "primary.main",
            marginX: "auto",
            marginY: 2,
          }}
        >
          <Stack spacing={2}>
  <TextField
    label="Adresse"
    type="text"
    required
    error={!!errors.address?.street}
    helperText={errors.address?.street && errors.address.street.message}
    {...register("address.street", {
      required: "Ce champ est obligatoire.",
    })}
  />
  <TextField
    label="Ville"
    type="text"
    required
    error={!!errors.address?.city}
    helperText={errors.address?.city && errors.address.city.message}
    {...register("address.city", {
      required: "Ce champ est obligatoire.",
    })}
  />
  <TextField
    label="Région"
    type="text"
    required
    error={!!errors.address?.region}
    helperText={errors.address?.state && errors.address.region.message}
    {...register("address.region", {
      required: "Ce champ est obligatoire.",
    })}
  />
  <TextField
    label="Code Postal"
    type="text"
    required
    error={!!errors.address?.postalCode}
    helperText={errors.address?.postalCode && errors.address.postalCode.message}
    {...register("address.postalCode", {
      required: "Ce champ est obligatoire.",
      pattern: {
        value: /^[0-9]{5}(?:-[0-9]{4})?$/, // Adjust regex based on your postal code format
        message: "Veuillez entrer un code postal valide",
      },
    })}
  />
  <TextField
    label="Pays"
    type="text"
    required
    error={!!errors.address?.country}
    helperText={errors.address?.country && errors.address.country.message}
    {...register("address.country", {
      required: "Ce champ est obligatoire.",
    })}
  />
</Stack>

          {" "}
          <Controller
            name="termsAccepted"
            control={control}
            render={({ field }) => (
              <FormControl error={!terms}>
                <FormControlLabel
                  label={
                    <span>
                      Accepter les{" "}
                      <Link
                        to={"/conditions-utilisation"}
                        className="underline font-semibold hover:bg-indigo-200 hover:bg-opacity-30 rounded-md"
                      >
                        termes et conditions d'utilisation
                      </Link>
                    </span>
                  }
                  {...field}
                  control={
                    <Checkbox
                      checked={terms}
                      required
                      onChange={(e) => {
                        setTerms(e.target.checked);
                        field.onChange(e.target.checked);
                      }}
                    />
                  }
                />{" "}
              </FormControl>
            )}
          />
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
            className="w-3/6 max-w-40 self-center"
          >
            {isSubmitting ? "Chargement" : "S'inscrire"}
          </Button>{" "}
          <Typography variant="caption">
            Vous avez déjà un compte ?{" "}
            <Link
              to={"/se-connecter"}
              className="underline font-semibold hover:bg-indigo-200 hover:bg-opacity-30 rounded-md"
            >
              Se connecter
            </Link>
          </Typography>
        </Stack>
      </form>
    </Container>
  );
}

export default CreateAccount;
