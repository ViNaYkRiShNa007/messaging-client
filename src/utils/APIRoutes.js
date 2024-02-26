import axios from "axios";
// import { useSelector } from "react-redux";

// const token = useSelector((state) => state.token);
// console.log(token);
const API = axios.create({
  baseURL: "http://localhost:3000/",
  // headers: {
  //   // "auth-token": localStorage.getItem("auth_token"),
  // },
});

export default API;
