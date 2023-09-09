import { useContext, useState, useEffect, useRef } from "react";
import {io} from 'socket.io-client'
import { UserContext } from "../../context/user.context";
import Message from "../../components/Message/Message";
import Messenger from "../../components/Messenger/Messenger";

const Chat = () => {
  const { currentUser } = useContext(UserContext);
  const [chat, setChat] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const userId = currentUser?._id;
  const scrollRef = useRef()
  const socket = useRef()

  useEffect(() => {
    socket.current = io('ws://localhost:8900')
    socket.current.on("getMessage", data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
    })
  }, [])

  useEffect (() => {
    arrivalMessage &&
    currentChat?.members.includes (arrivalMessage.sender) &&
    setMessages ((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

  useEffect(() => {
   socket.current.emit("addUser", userId)
   socket.current.on("getUsers", users => {
    // console.log(users)
    setOnlineUsers(users)
   })
  }, [currentUser])

  useEffect(() => {
    const getConversation = () => {
      fetch(`http://localhost:5000/api/chat/${userId}`, {
        headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
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

    const receiverId = currentChat.members.find(member => member !== userId)

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text:newMessage
    })

    fetch("http://localhost:5000/api/messages", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify({
        chatId: currentChat?._id,
        senderId: currentUser?._id,
        text: newMessage,
      })
    })
      .then((res) => res.json())
      .then((result) => {
        setMessages([...messages, result]);
        setNewMessage("")
      })
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  return (
    <div className="flex">
      {chat?.map((c) => (
        <div key={c._id} onClick={() => setCurrentChat(c)} className="">
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
          <div className="flex bg-gray-100 flex-col w-full">
            {messages?.map((m) => (
            <div ref={scrollRef}>
              <Message message={m} own={m?.senderId == userId} key={m._id} />
              </div>
            ))}
            <div className="flex items-center p-4">
              <input
                onChange={(e) => setNewMessage(e.target.value)}
                type="text"
                value={newMessage}
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
