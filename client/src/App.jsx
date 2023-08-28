import {Routes, Route} from 'react-router-dom'
import Home from "./routes/Home/Home.component";
import Login from "./routes/Login/Login.component";
import Navbar from './components/Navbar/Navbar.component';
import Register from './routes/Register/Register.component';
const App = () => {
  return(
  <Routes>
    <Route path='/' element={<Navbar />}>
    <Route index element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    </Route>
  </Routes>
  ) 
};

export default App;
