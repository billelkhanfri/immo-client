import { ratingActions } from "../slices/ratingSlice";
import { toast } from "react-toastify";
import request from "../../utils/request";

// GET - Get rating by ID
export function getRating(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/${id}/ratings`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(ratingActions.getRatingById(data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}

// POST - Create a new Rating
export function createRating(rating) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(`/api/users/${id}/ratings`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(ratingActions.create(data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}

// PUT - Update an existing Rating
export function updateRating(id, rating) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/rating/${id}`, rating, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(ratingActions.updateRating(data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}

// DELETE - Delete a rating
export function deleteRating(id) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/ratings/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(ratingActions.deleteRating(id));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}
