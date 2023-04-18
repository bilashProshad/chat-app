import api from "../../http";
import {
  getOtpFail,
  getOtpRequest,
  getOtpSuccess,
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
