import { authActions } from "../slices/authSlice";
import { toast } from "react-toastify";
import request from "../../utils/request";


// Login User
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/login", user);
      dispatch(authActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success(data.message);
    } catch (error) {
      // Gérer les différents types d'erreurs
      const errorMessage =
        error.response?.data?.message || // Pour le message de vérification de l'email
        error.response?.data?.errors || // S'il s'agit d'une liste d'erreurs
        error.response?.data?.error || // S'il s'agit d'un message d'erreur unique
        "Une erreur est survenue. Veuillez réessayer.";
      toast.error(errorMessage);
    }
  };
}


// Logout User
export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
  };
}

// Register User
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/register", user);
      dispatch(authActions.register(data.message));
      console.log(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}
// Verify Email
export function verifyEmail(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/${userId}/verify-email/${token}`);
      dispatch(authActions.setIsEmailVerified());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
