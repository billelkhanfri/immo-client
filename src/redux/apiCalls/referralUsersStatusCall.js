
import { referralUserStatusActions } from "../slices/referralUserStatusSlice";
import { toast } from "react-toastify";
import request from "../../utils/request";

// Fonction pour mettre à jour le statut de référence utilisateur
export const updateReferralUserStatus = (referralId, userId, status) => async (dispatch, getState) => {
    dispatch(referralUserStatusActions.updateReferralUserStatusStart());
    try {
      const { token } = getState().auth.user; // Récupérer le token d'authentification
      const response = await request.post('/api/referral-status', { referralId, userId, status }, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(referralUserStatusActions.updateReferralUserStatusSuccess(response.data));
    } catch (error) {
      dispatch(referralUserStatusActions.updateReferralUserStatusFailure(error.message));
      toast.error(error.response?.data?.message || 'Une erreur est survenue');
    }
  };

  
// Fonction pour obtenir le statut de référence utilisateur
export const getReferralUserStatus = (referralId, userId) => async (dispatch, getState) => {
    dispatch(referralUserStatusActions.getReferralUserStatusStart());
    try {
      const { token } = getState().auth.user; // Récupérer le token d'authentification
      const response = await request.get(`/api/referral-status/${referralId}/${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(referralUserStatusActions.getReferralUserStatusSuccess(response.data));
    } catch (error) {
      dispatch(referralUserStatusActions.getReferralUserStatusFailure(error.message));
      toast.error(error.response?.data?.message || 'Une erreur est survenue');
    }
  };
