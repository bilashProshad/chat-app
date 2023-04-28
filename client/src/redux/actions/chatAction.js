import api from "../../http";
import {
  addToChatFail,
  addToChatRequest,
  addToChatSuccess,
} from "../slices/addToChatSlice";
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

export const addUserToChat = (userId) => async (dispatch) => {
  try {
    dispatch(addToChatRequest());

    const { data } = await api.post(`/api/v1/chat`, { userId });

    dispatch(addToChatSuccess(data));
  } catch (error) {
    dispatch(addToChatFail(error.response.data.message));
  }
};
