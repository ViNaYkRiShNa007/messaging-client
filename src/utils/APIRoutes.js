import axios from "axios";
// import { useSelector } from "react-redux";

// const token = useSelector((state) => state.token);
// console.log(token);
// New route added
const API = axios.create({
  baseURL: "https://messaging-server.vercel.app/",
  // headers: {
  //   // "auth-token": localStorage.getItem("auth_token"),
  // },
});

export default API;
