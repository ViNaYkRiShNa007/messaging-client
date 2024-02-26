import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { friendActions } from "../store/slices/friendSlice";
import { currentFriendActions } from "../store/slices/currentFriend";
import { baseURL, PIC_BASE_URL } from "../utils/Constants";
import axios from "axios";
const Contacts = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends);
  async function getContacts() {
    const friends = await axios.get(`${baseURL}/allusers`, {
      headers: { "auth-token": localStorage.getItem("auth_token") },
    });
    dispatch(friendActions.getFriends(friends.data));
  }
  useEffect(() => {
    getContacts();
  }, []);
  function handleCurrentFriend(friend) {
    dispatch(currentFriendActions.getCurrentFriend(friend));
  }
  return (
    <div className="overflow-auto h-96">
      <table className="table">
        <tbody>
          {friends.map((friend, index) => {
            return (
              <>
                <tr
                  className="hover"
                  onClick={() => handleCurrentFriend(friend)}
                  key={index}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={`${PIC_BASE_URL}/${friend.pro_pic}`}
                            alt="Avatar "
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <div>
                        <div className="font-bold text-xl">
                          {friend.username}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;
// axios
//       .get(
//         `${baseURL}/allusers`,
//         {},
//         {
//           headers: { "auth-token": localStorage.getItem("auth_token") },
//         }
//       )
//       .then((res) => console.log(res.data))
//       .catch((err) => console.log(err.message));
