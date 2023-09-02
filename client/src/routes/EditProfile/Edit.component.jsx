import {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../../context/user.context'

const Edit = () => {
const preset_key = "Besocial";
  const cloud_name = "sensex";
  const navigate = useNavigate();
  const {currentUser, setCurrentUser} = useContext(UserContext)
  const [username, setUsername] = useState("");
  const [body, setBody] = useState("");
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
  }

  const updateProfile = (id) => {
    fetch(`http://localhost:5000/api/auth/edit/${id}`, {
        method: "put",
        headers: {
          "Content-type": "application/json",
          "Authorization": localStorage.getItem('token')
        },
        body: JSON.stringify({
          pic: url,
          username,
          body
        }),
    }).then(res => res.json())
    .then(response => {
        if(response.error) {
           return alert(response.error)
        } else {
            localStorage.removeItem("user")
            localStorage.setItem("user", JSON.stringify(response.updateUser))
            const updatedUser = JSON.parse(localStorage.getItem("user"));
            setCurrentUser(updatedUser)
            alert(response.message)
            navigate('/profile')
        }  
    })
  }

  return (
    <div>
      <section className="bg-gray-80 my-[60px]">
        <div className="md:w-[150vh] w-[55vh] mx-auto">
          <div className="flex h-[400px] justify-center">
            <div className="md:w-[500px] w-[350px] border mx-5 flex flex-col bg-gray-600 text-white">
              <div className="flex justify-between mx-9 my-8 w-[300px]">
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
              <div className='py-5'>
                <input
                  className="my-2 ms-9 ps-2 w-[250px] md:w-[300px] h-8 placeholder: outline-none text-gray-900"
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className="my-2 ms-9 ps-2 w-[250px] md:w-[300px] h-8 placeholder: outline-none text-gray-900"
                  type="text"
                  placeholder="Enter Bio"
                  onChange={(e) => setBody(e.target.value)}
                />
                <div className="mt-[10px]">
                  <button onClick={() => updateProfile(currentUser._id)}
                    type="submit"
                    className="ms-9 w-[100px] bg-gray-800 py-2 cursor-pointer hover:bg-gray-900 transition"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Edit