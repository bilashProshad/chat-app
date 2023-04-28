import api from "../../http";
import {
  searchUserFail,
  searchUserRequest,
  searchUserSuccess,
} from "../slices/searchUserSlice";

export const searchUser = (q) => async (dispatch) => {
  try {
    dispatch(searchUserRequest());

    const { data } = await api.get(`/api/v1/user?search=${q}`);

    dispatch(searchUserSuccess(data));
  } catch (error) {
    dispatch(searchUserFail(error.response.data.message));
  }
};
