import { referralAttributesActions } from "../slices/attributes";
import { toast } from "react-toastify";
import request from "../../utils/request";


// GET - Get all Referrals
export function getAllReferralAttributes() {
    return async (dispatch, getState) => {
      try {
        const { data } = await request.get(`/api/referrals-attributes`, {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        });
        dispatch(referralAttributesActions.getAllReferralAttributes(data));
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      }
    };
  }

  //GET - Get a single referral attribute by ID
export function getAttributeById(attributeId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/referrals-attributes/${attributeId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(referralAttributesActions.getAttributeById(data)); // Make sure you have the corresponding action
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.error);
    }
  };
}