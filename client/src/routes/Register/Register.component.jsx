import { Link } from 'react-router-dom';
import RegImg from '../../assets/regImage.png';
import Logo from '../../assets/besocial.png'

const Register = () => {
  return (
    <div>
      <section className="bg-gray-80 my-[60px]">
      <div className="w-[150vh] mx-auto">
        <div className="w-[600px] mx-auto my-5">
          <img src={Logo} className="h-9 w-[180px]" />
        </div>
        <div className="flex h-[400px]">
          <div className="w-[500px] border mx-5 flex flex-col bg-gray-600 text-white">
            <h1 className="text-3xl ms-9 mt-[70px] font-bold">
              Register your account
            </h1>
            <div className="my-5 ms-9">
            <input
                className="my-2 ps-2 w-[300px] h-8 placeholder: outline-none text-gray-900"
                type="text"
                placeholder="Enter your name"
              />
              <input
                className="my-2 ps-2 w-[300px] h-8 placeholder: outline-none text-gray-900"
                type="email"
                placeholder="Enter your email"
              />
              <br />
              <input
                className="my-2 ps-2 w-[300px] h-8 placeholder: outline-none text-gray-900"
                type="password"
                placeholder="Enter your password"
              />
              <div className="mt-[20px]">
                <button
                  type="submit"
                  className="w-[100px] bg-gray-800 py-2 cursor-pointer hover:bg-gray-900 transition"
                >
                  Signup
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