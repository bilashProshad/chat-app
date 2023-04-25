import api from "../../http";
import {
  fetchConversationFail,
  fetchConversationRequest,
  fetchConversationSucccess,
} from "../slices/conversationSlice";

export const fetchConversation = (id) => async (dispatch) => {
  try {
    dispatch(fetchConversationRequest());

    const { data } = await api.get(`/api/v1/message/${id}`);

    dispatch(fetchConversationSucccess(data));
  } catch (error) {
    dispatch(fetchConversationFail(error.response.data.message));
  }
};
