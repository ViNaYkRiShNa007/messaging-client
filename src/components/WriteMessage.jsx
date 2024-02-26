import React, { useState, useEffect } from "react";
import axios from "axios";
import { sendMessageRoute, headers } from "../utils/Constants";
import { useSelector, useDispatch } from "react-redux";
import { messageActions } from "../store/slices/messageSlice";
const WriteMessage = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [arrivedMessage, setArrivedMessage] = useState(null);
  const current_user = useSelector((state) => state?.user);
  const friend = useSelector((state) => state?.currentFriend);
  const dispatch = useDispatch();
  async function handleSend(event) {
    event.preventDefault();
    const sent_message = await axios.post(
      sendMessageRoute,
      {
        from: current_user._id,
        to: friend._id,
        message,
      },
      headers
    );
    socket.current.emit("send-msg", {
      to: friend._id,
      from: current_user._id,
      message,
    });
    dispatch(messageActions.addMessage({ self: true, message }));
    setMessage("");
  }
  useEffect(() => {
    socket?.current?.on("msg-recieve", (msg) => {
      setArrivedMessage({ self: false, message: msg });
    });
    if (socket.current) {
    }
  });
  useEffect(() => {
    dispatch(messageActions.addMessage(arrivedMessage));
  }, [arrivedMessage]);
  return (
    <form onSubmit={handleSend}>
      <div className="join mt-5 ">
        <input
          value={message}
          className="input input-bordered join-item w-96"
          placeholder="Write a message ... "
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="btn join-item rounded-r-full"
          disabled={message.length === 0 ? true : false}
          type="submit"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default WriteMessage;
