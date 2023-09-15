import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header.component";
import { UserContext } from "./context/user.context";
import Home from "./routes/Home/Home.component";
import Login from "./routes/Login/Login.component";
import Register from "./routes/Register/Register.component";
import Profile from "./routes/Profile/Profile.component";
import Post from "./routes/Post/Post.component";
import Edit from "./routes/EditProfile/Edit.component";
import UserProfile from "./routes/UserProfile/UserProfile.component";
import Chat from "./routes/chat/Chat";

const App = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setCurrentUser(user);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      // Handle the error, e.g., by redirecting to an error page
    }
  }, [navigate, setCurrentUser]);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createpost" element={<Post />} />
        <Route path="/editprofile" element={<Edit />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/chat" element={<Chat />} />
      </Route>
    </Routes>
  );
};

export default App;
