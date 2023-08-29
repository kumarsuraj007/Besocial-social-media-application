import { useState } from "react";

const Photo = () => {
  const preset_key = 'Besocial'
  const cloud_name = 'sensex'

  const [photo, setPhoto] = useState();
  const [url, setUrl] = useState();

  const handleChange = (e) => {
    setPhoto(URL.createObjectURL(e.target.files[0]));
    const profilePhoto = e.target.files[0]
    const formData = new FormData();
    formData.append('file', profilePhoto)
    formData.append('upload_preset', preset_key)
    fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: 'post',
        body: formData
    })
    .then(res => res.json())
    .then(response => setUrl(response.url))
    .catch(err => console.log(err))
}

  return (
    <div className="flex h-[80vh] justify-center items-center flex-col">
      <img className="w-[200px] h-[200px] rounded-full" src={photo} />
      <div>
        <h2 className="mt-[100px] text-center">
          Choose an avatar for your profile
        </h2>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Upload file
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          onChange={handleChange}
        />
        <button type="submit" onClick={profilePhotoUrl} className="bg-gray-600 text-white mt-[20px] px-6 py-1 hover:bg-gray-800 transition-all">Upload</button>
      </div>
    </div>
  );
};

export default Photo;
