import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/besocial.png";
import RegImg from "../../assets/regImage.png";

const Register = () => {
  const preset_key = "Besocial";
  const cloud_name = "sensex";
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState();
  const [url, setUrl] = useState();

  const handleChange = (e) => {
    setPhoto(URL.createObjectURL(e.target.files[0]));
    const profilePhoto = e.target.files[0];
    const formData = new FormData();
    formData.append("file", profilePhoto);
    formData.append("upload_preset", preset_key);
    fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((response) => setUrl(response.url))
      .catch((err) => console.log(err));
  };

  const Register = async () => {
    if (
      !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
        email
      )
    ) {
      alert("Invalid Email");
      return;
    }
    try {
      const fetchData = await fetch("http://localhost:5000/api/auth/register", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          pic: url,
          username,
          email,
          password,
        })
      });
      const response = await fetchData.json();
      if (response.error) {
        alert(response.error);
      } else {
        alert(response.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="bg-gray-80 my-[60px]">
        <div className="md:w-[150vh] w-[55vh] mx-auto">
          <div className="md:w-[600px] w-[200px] mx-auto my-5">
            <img src={Logo} className="h-9 w-[180px]" />
          </div>
          <div className="flex h-[400px]">
            <div className="md:w-[500px] w-[350px] border mx-5 flex flex-col bg-gray-600 text-white">
              <h1 className="md:text-3xl text-2xl ms-9 mt-[10px] font-bold">
                Register your account
              </h1>
              <div className="flex justify-between mx-9 w-[300px]">
                <img
                  className="w-[70px] h-[70px] rounded-full mt-2 object-cover"
                  src={photo}
                />
                <h2 className="flex items-center">Choose an avatar</h2>
              </div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              ></label>
              <input
                className="ms-9 block w-[302px] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                onChange={handleChange}
              />

              <div>
                <input
                  className="my-2 ms-9 ps-2 w-[250px] md:w-[300px] h-8 placeholder: outline-none text-gray-900"
                  type="text"
                  placeholder="Enter your username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className="my-2 ms-9 ps-2 w-[250px] md:w-[300px] h-8 placeholder: outline-none text-gray-900"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                  className="my-2 ms-9 ps-2 w-[250px] md:w-[300px] h-8 placeholder: outline-none text-gray-900"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="mt-[10px]">
                  <button
                    type="submit"
                    onClick={Register}
                    className="ms-9 w-[100px] bg-gray-800 py-2 cursor-pointer hover:bg-gray-900 transition"
                  >
                    Register
                  </button>
                  <Link to="/login">
                    <p className="ms-9 mt-2">Already have an account?</p>
                  </Link>
                </div>
              </div>
            </div>
            <img className="hidden md:flex h-[400px]" src={RegImg} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
