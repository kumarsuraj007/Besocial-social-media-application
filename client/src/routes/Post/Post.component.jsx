import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const navigate = useNavigate()
  const preset_key = "Besocial";
  const cloud_name = "sensex";
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [photo, setPhoto] = useState('')
  const [url, setUrl] = useState('')

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

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    const postData = {
      title,
      body,
      pic: url
    };

    fetch('http://localhost:5000/api/post/createpost', {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(response => {
      alert(response.Message);
      navigate('/');
    })
    .catch(err => console.log(err));
  }

  return (
    <div className='flex flex-col md:w-[120vh] w-[50vh] mx-auto shadow-md mt-5 h-[550px]'>
      <form onSubmit={handleSubmit}>
        <img className='h-[300px] object-contain' src={photo} alt="" />
        <div className='flex flex-col mt-5 mx-6 gap-4 item-center justify-center'>
          <input
            className="outline-none w-[302px] ps-2"
            type="text"
            placeholder='Title'
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="outline-none w-[302px] ps-2"
            type="text"
            placeholder='Body'
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <label
            className="block text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          ></label>
          <input
            className="block w-[302px] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={handleChange}
            required
          />
          <button
            type='submit'
            className="py-2 bg-gray-100 w-[302px] hover:bg-gray-200 cursor-pointer transition-all"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  )
}

export default Post;
