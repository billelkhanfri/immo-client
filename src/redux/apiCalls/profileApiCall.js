import { profileActions } from "../slices/profileSlice";
import { toast } from "react-toastify";
import request from "../../utils/request";
import { authActions } from "../slices/authSlice";


// PUT - Update User
export function updateProfileUser(id, formData) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/profiles/${id}`, formData, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileActions.updateProfile(data));
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error("Update Profile Error:", error.response?.data);
    }
  };
}

// POST - Add profile picture
export function uploadProfilePicture(formData) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `/api/profiles/profile-photo-upload`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data.imageUrl)
      dispatch(profileActions.postProfilePicture(data));
       dispatch(authActions.setUserPhoto(data.imageUrl))
toast.success(data.message)
       // modify the user in local storage with new photo

       const user = JSON.parse(localStorage.getItem("userInfo"));
       user.profilePhoto = data?.imageUrl;
       localStorage.setItem("userInfo", JSON.stringify(user))

    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error("Upload Profile Picture Error:", error.response?.data);
    }
  };
}

// DELETE - Delete Profile Picture
export function deleteProfilePicture(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(
        `/api/profiles/profile-photo-upload`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.deleteProfilePicture(data));
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error("Delete Profile Picture Error:", error.response?.data);
    }
  };
}
