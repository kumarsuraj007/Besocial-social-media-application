import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/user.context";
import Message from "../../components/Message/Message";
import Messenger from "../../components/Messenger/Messenger";

const Chat = () => {
  const { currentUser } = useContext(UserContext);
  const [chat, setChat] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
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
  }, [currentUser, chat]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/messages", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        chatId: currentChat?._id,
        senderId: currentUser?._id,
        text: newMessage,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setMessages([...messages, result]);
      });
  };

  return (
    <div className="flex">
      {chat?.map((c) => (
        <div key={c._id} onClick={() => setCurrentChat(c)}>
          <Messenger
            chat={c}
            currentUser={currentUser}
            setMessage={setMessages}
            key={c._id}
          />
        </div>
      ))}

      {currentChat ? (
        <>
          <div className="flex bg-gray-100 h-screen flex-col w-full">
            {messages?.map((m) => (
              <Message message={m} own={m?.senderId == userId} key={m._id} />
            ))}
            <div className="flex items-center p-4">
              <input
                onChange={(e) => setNewMessage(e.target.value)}
                type="text"
                placeholder="Type your message..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2"
              />
              <button
                className="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
                onClick={handleSubmit}
              >
                Send
              </button>
            </div>
          </div>
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
