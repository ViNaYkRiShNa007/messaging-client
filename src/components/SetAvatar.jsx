import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../utils/APIRoutes";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/slices/userSlice";
import { PIC_BASE_URL } from "../utils/Constants";
const SetAvatar = () => {
  const [avatar, setAvatar] = useState();
  const up_file = useRef();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  function handleUpload(event) {
    console.log(avatar);
    try {
      if (avatar === undefined) {
        toast.error("Upload a pic!", toastOptions);
      } else {
        const formdata = new FormData();
        formdata.append("file", avatar);
        axios
          .post("/upload", formdata, {
            headers: { "auth-token": localStorage.getItem("auth_token") },
          })
          .then((res) => {
            console.log(res.data);
            dispatch(userActions.getUser(res.data));
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate("/chats");
          })
          .catch((err) => console.log(err.message));
        // up_file.current.value = undefined;
      }
    } catch (error) {
      toast.error("Something went wrong!", toastOptions);
      console.log(error.message);
    }
  }
  useEffect(() => {
    if (user?.pro_pic !== "") {
      navigate("/chats");
    }
  }, []);

  return (
    <div className="card m-14 bg-gray-600 shadow-xl">
      <ToastContainer />
      <div className="card-body" data-theme="dark">
        <h2 className="card-title justify-center font-extrabold text-5xl">
          Choose an Avatar for profile pic
        </h2>
        <center>
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={`${PIC_BASE_URL}/${user?.pro_pic}`} alt="profile_pic" />
            </div>
          </div>
          <br />
          <br />
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Pick a file</span>
            </div>
            <input
              type="file"
              ref={up_file}
              accept="image/*"
              className="file-input file-input-bordered w-full max-w-xs"
              onChange={(event) => {
                setAvatar(event.target.files[0]);
              }}
            />
          </label>
        </center>
        <div className="card-actions justify-end">
          <button
            className="btn btn-active rounded-full text-xl"
            onClick={handleUpload}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetAvatar;
// import axios from "axios";
// import { Buffer } from "buffer";
// const api = "https://api.multiavatar.com/4645646";
// const navigate = useNavigate();
// const [avatars, setAvatars] = useState([1, 2, 3, 4]);
// const [loading, setLoading] = useState(true);
// const [selectedAvatars, setSelectedAvatars] = useState(undefined);
// const toastOptions = {
//   position: "top-center",
//   autoClose: 3000,
//   pauseOnHover: true,
//   draggable: true,
//   theme: "dark",
// };

// async function getAvatars() {
//   // const data = [];
//   // for (let i = 0; i < 4; i++) {
//   //   const image = await axios.get(
//   //     `${api}/${Math.round(Math.random() * 1000)}`
//   //   );
//   //   console.log(image);
//   //   const buffer = new Buffer(image.data);
//   //   data.push(buffer.toString("base64"));
//   // }
//   // setAvatars(data);
//   setLoading(false);
// }
// useEffect(() => {
//   getAvatars();
// }, []);
// console.log(avatars);
