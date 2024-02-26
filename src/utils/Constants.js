export const baseURL = "http://localhost:3000";
export const PIC_BASE_URL = "http://localhost:3000/images/";
export const sendMessageRoute = `${baseURL}/messages/addmsg`;
export const getMessageRoute = `${baseURL}/messages/getmsg`;
export const headers = {
  headers: { "auth-token": localStorage.getItem("auth_token") },
};
