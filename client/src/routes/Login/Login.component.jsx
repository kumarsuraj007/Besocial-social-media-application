import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/besocial.png";
import LoginImg from "../../assets/Login.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Login = async () => {
    if (
      !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
        email
      )
    ) {
      alert('Invalid Email')
      return;
    }
    try {
      const fetchData = await fetch("http://localhost:5000/api/auth/login", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const response = await fetchData.json();
      console.log(response)
      if (response.error) {
        alert(response.error)
      } else {
        alert(response.message)
        // navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
}
  return (
    <section className="bg-gray-80 my-[60px]">
      <div className="md:w-[150vh] w-[55vh] mx-auto">
        <div className="md:w-[600px] w-[200px] mx-auto my-5">
          <img src={Logo} className="h-9 w-[180px]" />
        </div>
        <div className="flex h-[400px]">
          <div className="md:w-[500px] w-[350px] border mx-5 flex flex-col bg-gray-600 text-white">
            <h1 className="md:text-3xl text-2xl ms-9 mt-[70px] font-bold">
              Login to your account
            </h1>
            <div className="my-5 ms-9">
              <input
                className="my-5 ps-2 w-[250px] md:w-[300px] h-8 placeholder: outline-none text-gray-900"
                type="email"
                placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                className="my-2 ps-2 w-[250px] md:w-[300px] h-8 placeholder: outline-none text-gray-900"
                type="password"
                placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}
              />
              <div className="mt-[20px]">
                <button onClick={Login}
                  type="submit"
                  className="w-[100px] bg-gray-800 py-2 cursor-pointer hover:bg-gray-900 transition"
                >
                  Login
                </button>
                <Link to="/register">
                  <p className="mt-2">Don't have an account?</p>
                </Link>
              </div>
            </div>
          </div>
          <img className="hidden md:flex h-[400px]" src={LoginImg} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Login;
