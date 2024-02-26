import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";
import { io } from "socket.io-client";
import { baseURL, PIC_BASE_URL } from "../utils/Constants";
import {
  Contacts,
  UserDetails,
  ContactDetails,
  ChatBox,
  WriteMessage,
} from "../components";
const Chats = () => {
  const user = useSelector((state) => state.user);
  const socket = useRef();
  const currentFriend = useSelector((state) => state.currentFriend);
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }
  useEffect(() => {
    if (currentFriend) {
      socket.current = io(baseURL, {
        withCredentials: true,
        transports: ["websocket"],
      });
      socket.current.emit("add-user", currentFriend._id);
    }
  }, [currentFriend]);
  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <center>
        <div className="container mt-8" data-theme="cupcake">
          <div className="card">
            <div className="grid grid-cols-4">
              <div className="">
                <h1 className="text-3xl font-extrabold mt-3">
                  Contacts{" "}
                  <button
                    className="btn btn-error  text-white font-sans text-xl"
                    onClick={handleLogout}
                  >
                    <FaPowerOff />
                  </button>
                </h1>
                <Contacts />
                <UserDetails />
              </div>
              <div className="col-span-3 bg-white">
                {Object.keys(currentFriend).length === 0 ? (
                  ""
                ) : (
                  <ContactDetails />
                )}
                <div>
                  {Object.keys(currentFriend).length === 0 ? (
                    <img src="/hi-robot.gif" className="h-96" />
                  ) : (
                    <ChatBox socket={socket} />
                  )}

                  <div>
                    {Object.keys(currentFriend).length === 0 ? (
                      ""
                    ) : (
                      <WriteMessage socket={socket} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default Chats;
