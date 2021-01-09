import { combineReducers } from "redux";

const userData = (data = {}, action) => {
  if (action.type === "USER_DATA" && action.payload.length > 0) {
    action.payload.map((user) => {
      data[user.id] = user;
      return user;
    });
    return data;
  }
  return data;
};

export default combineReducers({ userData: userData });
