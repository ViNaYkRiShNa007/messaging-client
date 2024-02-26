import React from "react";
import { useSelector } from "react-redux";
import { PIC_BASE_URL } from "../utils/Constants";
const UserDetails = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={`${PIC_BASE_URL}/${user?.pro_pic}`}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <div className="font-bold text-xl">{user?.username}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
