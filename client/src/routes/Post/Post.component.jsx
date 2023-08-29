import React, { useState } from 'react'

const Post = () => {
  const preset_key = "Besocial";
  const cloud_name = "sensex";
  const [title, setTitle] = useState()
  const [body, setBody] = useState()
  const [photo, setPhoto] = useState()
  const [url, setUrl] = useState()

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

  const PostData = () => {
    const fetchPostData = fetch('http://localhost:5000/api/post/createpost', {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer " + localStorage.getItem("token")
      },
      body:JSON.stringify({
        title,
        body,
        pic:url
      })
    }).then(res => res.json())
    .then(response => alert(response.Message))
    .catch(err => console.log(err))
  }

  return (
    <div className='flex flex-col md:w-[120vh] w-[50vh] mx-auto shadow-md mt-5 h-[550px]'>
      <img className='h-[300px] object-contain' src={photo} alt="" />
      <div className='flex flex-col mt-5 mx-6 gap-4 item-center justify-center'>
      <input className="w-[302px] ps-2" type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
      <input className="w-[302px] ps-2" type="text" placeholder='Body' onChange={(e) => setBody(e.target.value)} />
      <label
                className="block text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              ></label>
              <input
                className=" block w-[302px] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                onChange={handleChange}
              />
      <button type='submit' onClick={PostData} className="py-2 bg-gray-100 w-[302px] hover:bg-gray-200 curson-pointer transition-all">Upload</button>
      </div>
      
    </div>
  )
}

export default Post