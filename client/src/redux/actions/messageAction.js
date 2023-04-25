import api from "../../http";
import {
  fetchConversationFail,
  fetchConversationRequest,
  fetchConversationSucccess,
} from "../slices/conversationSlice";
import {
  sendMessageFail,
  sendMessageRequest,
  sendMessageSuccess,
} from "../slices/messageSlice";

export const fetchConversation = (id) => async (dispatch) => {
  try {
    dispatch(fetchConversationRequest());

    const { data } = await api.get(`/api/v1/message/${id}`);

    dispatch(fetchConversationSucccess(data));
  } catch (error) {
    dispatch(fetchConversationFail(error.response.data.message));
  }
};

export const sendMessage =
  ({ text, chatId }) =>
  async (dispatch) => {
    try {
      dispatch(sendMessageRequest());

      const { data } = await api.post("/api/v1/message", { text, chatId });

      dispatch(sendMessageSuccess(data));
    } catch (error) {
      dispatch(sendMessageFail(error.response.data.message));
    }
  };
