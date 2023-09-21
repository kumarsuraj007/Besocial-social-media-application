import React, { useState } from 'react';

function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      console.error('Please select a video file.');
      return;
    }
  
    const formData = new FormData();
    formData.append('video', selectedFile);
    formData.append('title', title);
    formData.append('body', body);
  
    fetch('http://localhost:5000/api/videos/upload', {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Video upload failed.');
          throw new Error('Video upload failed.');
        }
      })
      .then((result) => {
        console.log('Video uploaded successfully:', result);
        setVideoUrl(result.videoUrl);
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  return (
    <div className="flex flex-col md:w-[120vh] w-[50vh] mx-auto shadow-md mt-5 h-[550px]">
      <div className="flex flex-col mt-5 mx-6 gap-4 item-center justify-center">
        <input
          className="outline-none w-[302px] ps-2"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="outline-none w-[302px] ps-2"
          type="text"
          placeholder="Body"
          value={body}
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
      {videoUrl && (
        <div className="mt-5">
          <video controls width="400">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

export default VideoUpload;
