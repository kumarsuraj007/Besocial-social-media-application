import { useEffect, useState } from "react";

const Friends = ({ onlineUsers, currentUser, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);


  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/friends/${currentUser?._id}`, {
          headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch friends');
        }

        const result = await response.json();
        setFriends(result);
      } catch (error) {
        console.error(error);
      }
    };

    getFriends();
  }, [currentUser]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers?.includes(f._id)));
  }, [friends, onlineUsers]);


  const handleClick = async (user) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/findallconvo/${currentUser?._id}/${user._id}`, {
        headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      });

      if (!response.ok) {
        // throw new Error('Failed to find conversation');

        fetch(`http://localhost:5000/api/chat`, {
          method: "post",
          headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
          body: JSON.stringify({
            senderId: currentUser?._id,
            receiverId: onlineFriends[0]._id
          })    
        }).then(res => res.json())
        .then(result => setCurrentChat(result))
      }

      const result = await response.json();
      setCurrentChat(result);

      // Handle setting the current chat or any other logic here
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <div className="w-[30vh]">
        {/* <h1 className="text-xl px-4">Online Friends</h1> */}
      {onlineFriends?.map((o) => (
        <div className="flex items-center cursor-pointer w-full py-1 px-2" onClick={() => handleClick(o)}>
          <div className="py-5">
            <img
              className="h-[50px] w-[50px] rounded-full object-cover"
              src={
                o?.profilePicture
              }
              alt=""
            />
            {/* <div className="bg-gray h-4 w-4 rounded-full">ss</div> */}
          </div>
          <span className="flex items-center px-5">{o?.username}</span>
        </div>
      ))}
    </div>
  )
}

export default Friends
