import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";
import { ToastContainer } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (FormData) => {
    dispatch(loginUser(FormData));
  };
  return (
    <>
      {" "}
      <Container
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: 2,
          padding: 2,
        }}
      >
        <ToastContainer />
        <Typography
          variant="h2"
          sx={{ mx: 4, textAlign: "center", color: "primary.main" }}
        >
          Se connecter
        </Typography>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack
            spacing={2}
            sx={{
              display: "flex",
              textAlign: "center",
              color: "primary.main",
              maxWidth: "30rem",
              marginX: "auto",
              marginY: 2,
            }}
          >
            <TextField
              label="Adresse e-mail ou CPI"
              type="text"
              {...register("emailOrCpi")}
            />
            <Typography variant="caption" textAlign={"start"}>
              <Link to={"/"} className="underline font-semibold">
                <span className="hover:bg-indigo-200 hover:bg-opacity-30 rounded-md">
                  Adresse e-mail oubliée ?
                </span>
              </Link>
            </Typography>
            <TextField
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              {...register("password")}
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
            />
            <Typography variant="caption" textAlign={"start"}>
              <Link to={"/"} className="underline font-semibold">
                <span className="hover:bg-indigo-200 hover:bg-opacity-30 rounded-md">
                  Mot de passe oubliée ?
                </span>
              </Link>
            </Typography>
            <Button
              className="w-3/6 self-center"
              type="submit"
              variant="contained"
              color="primary"
            >
              Se connecter
            </Button>
            <Typography variant="caption">
              Vous n'avez pas de compte ?{" "}
              <Link
                to={"/inscription"}
                className="underline font-semibold hover:bg-indigo-200 hover:bg-opacity-30 rounded-md"
              >
                S'inscrire
              </Link>
            </Typography>
          </Stack>
        </form>
      </Container>
    </>
  );
}

export default Login;
