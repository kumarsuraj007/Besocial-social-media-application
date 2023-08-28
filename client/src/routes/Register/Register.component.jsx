import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/besocial.png'
import RegImg from '../../assets/regImage.png';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Register = async () => {
    if (
      !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
        email
      )
    ) {
      alert('Invalid Email')
      return;
    }
    try {
      const fetchData = await fetch("http://localhost:5000/api/auth/register", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });
      const response = await fetchData.json();
      if (response.error) {
        alert(response.error)
      } else {
        alert(response.message)
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
}

  return (
    <div>
      <section className="bg-gray-80 my-[60px]">
      <div className="w-[150vh] mx-auto">
        <div className="w-[600px] mx-auto my-5">
          <img src={Logo} className="h-9 w-[180px]" />
        </div>
        <div className="flex h-[400px]">
          <div className="w-[500px] border mx-5 flex flex-col bg-gray-600 text-white">
            <h1 className="text-3xl ms-9 mt-[40px] font-bold">
              Register your account
            </h1>
            <div className="my-5 ms-9">
            <input
                className="my-2 ps-2 w-[300px] h-8 placeholder: outline-none text-gray-900"
                type="text"
                placeholder="Enter your name" onChange={(e) => setName(e.target.value)}
              />
            <input
                className="my-2 ps-2 w-[300px] h-8 placeholder: outline-none text-gray-900"
                type="text"
                placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="my-2 ps-2 w-[300px] h-8 placeholder: outline-none text-gray-900"
                type="email"
                placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                className="my-2 ps-2 w-[300px] h-8 placeholder: outline-none text-gray-900"
                type="password"
                placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}
              />
              <div className="mt-[20px]">
                <button
                  type="submit" onClick={Register}
                  className="w-[100px] bg-gray-800 py-2 cursor-pointer hover:bg-gray-900 transition"
                >
                  Register
                </button>
                <Link to="/login">
                  <p className="mt-2">Already have an account?</p>
                </Link>
              </div>
            </div>
          </div>
          <img className="h-[400px]" src={RegImg} alt="" />
        </div>
      </div>
    </section>
    </div>
  )
}

export default Register