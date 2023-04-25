import api from "../../http";
import {
  fetchAllChatFail,
  fetchAllChatRequest,
  fetchAllChatSuccess,
} from "../slices/chatsSlice";

export const fetchChats = () => async (dispatch) => {
  try {
    dispatch(fetchAllChatRequest());

    const { data } = await api.get(`/api/v1/chat`);

    dispatch(fetchAllChatSuccess(data));
  } catch (error) {
    dispatch(fetchAllChatFail(error.response.data.message));
  }
};
