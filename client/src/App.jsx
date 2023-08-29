import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./routes/Home/Home.component";
import Login from "./routes/Login/Login.component";
import Register from "./routes/Register/Register.component";
import Header from "./components/Header/Header.component";
import Photo from "./routes/Photo/photo.components";
import { UserContext } from "./context/user.context";

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
        <Route path="/photo" element={<Photo />} />
      </Route>
    </Routes>
  );
};

export default App;
