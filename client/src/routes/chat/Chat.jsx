import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/user.context";
import Message from "../../components/Message/Message";
import Messenger from "../../components/Messenger/Messenger";

const Chat = () => {
  const { currentUser } = useContext(UserContext);
  const [chat, setChat] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const userId = currentUser?._id;

  useEffect(() => {
    const getConversation = () => {
      fetch(`http://localhost:5000/api/chat/${userId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((result) => setChat(result));
    };
    getConversation();
  }, [currentUser]);

  useEffect(() => {
    const getMessages = () => {
      fetch(`http://localhost:5000/api/messages/${currentChat?._id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((result) => setMessages(result));
    };
    getMessages();
  }, [currentChat]);

  return (
    <div className="flex">
      {chat?.map((c) => (
        <div onClick={() => setCurrentChat(c)}>
          <Messenger chat={c} currentUser={currentUser} key={c._id} />
        </div>
      ))}

      {currentChat ? (
        <>
          {messages?.map((m) => (
            <Message message={m} own={m?.senderId == userId} key={m._id} />
          ))}
        </>
      ) : (
        <span className="relative top-[200px] mx-auto text-5xl text-gray-400">
          Open Chat
        </span>
      )}
    </div>
  );
};

export default Chat;
