import api from "../../http";
import {
  addGroupChatFail,
  addGroupChatRequest,
  addGroupChatSuccess,
} from "../slices/AddGroupChatSlice";
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
import {
  addUserFail,
  addUserRequest,
  addUserSuccess,
  removeUserFail,
  removeUserRequest,
  removeUserSuccess,
  updateNameFail,
  updateNameRequest,
  updateNameSuccess,
} from "../slices/updateGroupSlice";

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

export const createGroupChat =
  ({ name, users }) =>
  async (dispatch) => {
    try {
      dispatch(addGroupChatRequest());

      const { data } = await api.post(`/api/v1/chat/group`, { name, users });

      dispatch(
        addGroupChatSuccess({ chat: data.groupChat, success: data.success })
      );
    } catch (error) {
      dispatch(addGroupChatFail(error.response.data.message));
    }
  };

export const removeGroupUser =
  ({ chatId, userId }) =>
  async (dispatch) => {
    try {
      dispatch(removeUserRequest());

      const { data } = await api.put(`/api/v1/chat/group/${chatId}/remove`, {
        userId,
      });

      dispatch(removeUserSuccess(data));
    } catch (error) {
      dispatch(removeUserFail(error.response.data.message));
    }
  };

export const addGroupUser =
  ({ chatId, userId }) =>
  async (dispatch) => {
    try {
      dispatch(addUserRequest());

      const { data } = await api.put(`/api/v1/chat/group/${chatId}/add`, {
        userId,
      });

      dispatch(addUserSuccess(data));
    } catch (error) {
      dispatch(addUserFail(error.response.data.message));
    }
  };

export const renameGroupChat =
  ({ chatId, chatName }) =>
  async (dispatch) => {
    try {
      dispatch(updateNameRequest());

      const { data } = await api.put(`/api/v1/chat/group/${chatId}/rename`, {
        chatName,
      });

      dispatch(updateNameSuccess(data));
    } catch (error) {
      dispatch(updateNameFail(error.response.data.message));
    }
  };
