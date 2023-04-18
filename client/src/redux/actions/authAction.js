import api from "../../http";
import { getOtpFail, getOtpRequest, getOtpSuccess } from "../slices/authSlice";

export const getOtp = (email) => async (dispatch) => {
  try {
    dispatch(getOtpRequest());

    const { data } = await api.post(`/api/v1/user/send-otp`, { email });

    dispatch(getOtpSuccess(data));
  } catch (error) {
    dispatch(getOtpFail(error.response.data.message));
  }
};
