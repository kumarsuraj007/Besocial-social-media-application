import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./routes/Home/Home.component";
import Login from "./routes/Login/Login.component";
import Register from "./routes/Register/Register.component";
import Header from "./components/Header/Header.component";
import { UserContext } from "./context/user.context";
import Profile from "./routes/Profile/Profile.component";
import Post from "./routes/Post/Post.component";
import Edit from "./routes/EditProfile/Edit.component";
import UserProfile from "./routes/UserProfile/UserProfile.component";
import './App.css'

const App = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="/createpost" element={<Post />} /> 
        <Route path="/editprofile" element={<Edit />} /> 
        <Route path="/profile/:userId" element={<UserProfile />} /> 
      </Route>
    </Routes>
  );
};

export default App;
