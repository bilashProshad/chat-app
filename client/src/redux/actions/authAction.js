import api from "../../http";
import {
  activateUserFail,
  activateUserRequest,
  activateUserSuccess,
  getOtpFail,
  getOtpRequest,
  getOtpSuccess,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  logoutFail,
  logoutSuccess,
  verifyOtpFail,
  verifyOtpRequest,
  verifyOtpSuccess,
} from "../slices/authSlice";

export const getOtp = (email) => async (dispatch) => {
  try {
    dispatch(getOtpRequest());

    const { data } = await api.post(`/api/v1/user/send-otp`, { email });

    dispatch(getOtpSuccess(data));
  } catch (error) {
    dispatch(getOtpFail(error.response.data.message));
  }
};

export const verifyOtp =
  ({ otp, hash, email }) =>
  async (dispatch) => {
    try {
      dispatch(verifyOtpRequest());

      const { data } = await api.post(`/api/v1/user/verify-otp`, {
        email,
        otp,
        hash,
      });

      dispatch(verifyOtpSuccess(data));
    } catch (error) {
      dispatch(verifyOtpFail(error.response.data.message));
    }
  };

export const activateUser = (userData) => async (dispatch) => {
  try {
    dispatch(activateUserRequest());

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };

    const { data } = await api.post(`/api/v1/user/activate`, userData, config);

    dispatch(activateUserSuccess(data));
  } catch (error) {
    dispatch(activateUserFail(error.response.data.message));
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await api.get(`/api/v1/user/me`);

    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/v1/user/logout`);

    dispatch(logoutSuccess(data));
  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};
