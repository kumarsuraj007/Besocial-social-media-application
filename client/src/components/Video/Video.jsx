import React, { useState } from "react";

function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("video", selectedFile);

   fetch("http://localhost:5000/api/videos/upload", {
    method:"POST",
    headers: {
        'Authorization': "Bearer " + localStorage.getItem("token"),
    },
    body:JSON.stringify({
      title, body, selectedFile
    })
   }).then(res => res.json())
   .then(result => console.log(result))
  };

  return (
    <div className="flex flex-col md:w-[120vh] w-[50vh] mx-auto shadow-md mt-5 h-[550px]">
      <div className="flex flex-col mt-5 mx-6 gap-4 item-center justify-center">
        <input
          className="outline-none w-[302px] ps-2"
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="outline-none w-[302px] ps-2"
          type="text"
          placeholder="Body"
          onChange={(e) => setBody(e.target.value)}
        />
        <label
          className="block text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        ></label>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button
          className="py-2 bg-gray-100 w-[302px] hover:bg-gray-200 cursor-pointer transition-all"
          onClick={handleUpload}
        >
          Upload Video
        </button>
      </div>
    </div>
  );
}

export default VideoUpload;
