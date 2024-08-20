import { userActions } from "../slices/userSlice.js";
import { toast } from "react-toastify";
import request from "../../utils/request";

// GET - Get user by ID
export function getUserByID(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(userActions.getUserByID(data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}

// PUT - Update user data

export function updateUser(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/users/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(userActions.updateUser(data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}

// DELETE - Delete user data

export function deleteUser(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/users/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(userActions.deleteUser(data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}

// GET - GET all users
export function getAllUsers() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(userActions.getAllUser(data));
    
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}
