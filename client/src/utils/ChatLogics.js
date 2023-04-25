export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const myMessage = (loggedUserId, senderId) => {
  return senderId === loggedUserId ? true : false;
};
