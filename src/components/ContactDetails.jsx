import React from "react";
import { useSelector } from "react-redux";
import { PIC_BASE_URL } from "../utils/Constants";
const ContactDetails = () => {
  const currentFriend = useSelector((state) => state.currentFriend);
  return (
    <div className="flex items-center gap-3">
      <div className="avatar">
        <div className="mask mask-squircle w-12 h-12">
          <img
            src={`${PIC_BASE_URL}/${currentFriend.pro_pic}`}
            alt="Avatar Tailwind CSS Component"
          />
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <div className="font-bold text-xl">{currentFriend.username}</div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
