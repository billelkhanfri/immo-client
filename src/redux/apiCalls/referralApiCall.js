import { referralActions } from "../slices/referralSlice.js";
import { toast } from "react-toastify";
import request from "../../utils/request";

// GET - Get all Referrals
export function getAllReferrals() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/referrals`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(referralActions.getAllReferrals(data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}

// GET - Get a single Referral by ID
export function getReferral(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/referrals/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(referralActions.getReferral(data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}

// POST - Create a new Referral
export function createReferral(referral) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(`/api/referrals`, referral, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(referralActions.create(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// PUT - Update an existing Referral
export function updateReferral(id, referral) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/referrals/${id}`, referral, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(referralActions.updateReferral(data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}



// PATCH - Update Referral Status
export function updateReferralStatus(id, status) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.patch(
        `/api/referrals/${id}/status`,
        { status },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(referralActions.updateReferralStatus({ id, status: data.status }));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}


// DELETE - Delete a Referral
export function deleteReferral(id) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/referrals/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(referralActions.deleteReferral(id));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}
