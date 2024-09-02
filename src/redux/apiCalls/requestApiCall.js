import { referralRequestActions } from "../slices/requestSlice.js";
import { toast } from "react-toastify";
import request from "../../utils/request";

// POST - Create a new referral request
export function createReferralRequest(referralId) {
  return async (dispatch, getState) => {
    try {
      const {
        auth: { user },
      } = getState();

      const { data } = await request.post(
        `/api/referrals/${referralId}/request`, // Correction de l'URL
        {}, // Le corps de la requête est vide
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Utilisation de backticks pour l'authentification
          },
        }
      );

      dispatch(referralRequestActions.create(data)); // Dispatch de l'action pour créer la demande de referral
    } catch (error) {
      toast.error(error.response?.data?.message || "Une erreur est survenue");
      // Gestion des erreurs avec un message par défaut
      console.log(error.response?.data?.message);
    }
  };
}
// GET - Get all requests
export function getAllRequests() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/referral-requests`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(referralRequestActions.getAllRequests(data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}

// GET - Get a single requestl by ID
export function getRequest(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/referral-requests/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(referralRequestActions.getRequest(data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}

// PATCH - Update Request Status
export function updateRequestStatus(id, status) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.patch(
        `/api/referral-requests/status/${id}`,
        { status },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(
        referralRequestActions.updateRequestStatus({ id, status: data.status })
      );
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}
