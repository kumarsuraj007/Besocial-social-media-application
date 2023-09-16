import React, { useRef } from 'react';
import Webcam from 'react-webcam';

function CameraComponent() {
  const webcamRef = useRef(null);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // You can now handle and upload the captured image to your server.
  };

  return (
    <div className='flex flex-col'>
      <Webcam className='w-[100vh] h-auto mx-auto'
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button className='bg-gray-300 p-2 w-[150px] mx-auto mt-8 hover:bg-gray-400 transition-all' onClick={captureImage}>Capture</button>
    </div>
  );
}

export default CameraComponent;
