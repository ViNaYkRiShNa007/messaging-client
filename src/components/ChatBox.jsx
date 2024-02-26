import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { messageActions } from "../store/slices/messageSlice";
import {
  baseURL,
  getMessageRoute,
  headers,
  PIC_BASE_URL,
} from "../utils/Constants";
import { v4 as uuidv4 } from "uuid";
const ChatBox = ({ socket }) => {
  // const [chats, setChats] = useState([]);

  const chats = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const current_user = useSelector((state) => state?.user);
  const friend = useSelector((state) => state?.currentFriend);
  async function getMessages() {
    const messages = await axios.post(
      getMessageRoute,
      {
        from: current_user._id,
        to: friend._id,
      },
      headers
    );

    dispatch(messageActions.getmessages(messages.data));
  }
  useEffect(() => {
    if (friend) {
      getMessages();
    }

    // socket.current = io(baseURL, friend._id);
  }, [friend, chats]);

  return (
    <div className="h-96 overflow-auto">
      {chats.length === 0 ? (
        <img src="hi-robot.gif" />
      ) : (
        chats.map((message) => {
          return (
            <>
              {message?.self ? (
                <div className="chat chat-end" key={uuidv4}>
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={`${PIC_BASE_URL}/${current_user?.pro_pic}`}
                      />
                    </div>
                  </div>
                  <div className="chat-bubble">{message.message}</div>
                </div>
              ) : (
                <div className="chat chat-start" key={uuidv4}>
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={`${PIC_BASE_URL}/${friend?.pro_pic}`}
                      />
                    </div>
                  </div>
                  <div className="chat-bubble">{message?.message}</div>
                </div>
              )}
            </>
          );
        })
      )}
    </div>
  );
};

export default ChatBox;
