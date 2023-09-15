import { useState, useEffect } from "react";

const Messenger = ({ currentUser, chat }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = chat?.members?.find((m) => m !== currentUser?._id);

    const getUser = () => {
      fetch(`http://localhost:5000/api/profile/user/${friendId}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((result) => setUser(result.findUser));
    };
    getUser();
  }, [currentUser, chat]);

  return (
    <div className="flex">
      <div className="md:w-[45vh] w-[15vh]">
        <div className="flex items-center hover:bg-gray-200 transition-all cursor-pointer py-4 px-5">
          <img
            src={user?.photo}
            alt=""
            className="h-[60px] w-[60px] md:flex hidden rounded-full object-cover"
          />
          <span className="px-5 text-[18px]">{user?.username}</span>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default Messenger;
