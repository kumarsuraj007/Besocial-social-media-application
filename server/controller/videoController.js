import asyncHandler from 'express-async-handler';
import multer from 'multer';
import path from 'path';
import Video from '../model/videoModel.js';
import fs from 'fs';

// Define the upload directory path
const uploadDirectory = './uploads'; // Replace with your desired directory path

// Ensure the upload directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Set up multer to handle file uploads (store videos in the 'uploads' folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Define the upload middleware here
const upload = multer({ storage });

// Upload a video
export const uploadVideo = asyncHandler(upload.single('video'), async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Construct the video URL
    const videoUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    // Create a new video document in MongoDB
    const video = new Video({
      title: req.body.title,
      body: req.body.body,
      videoUrl: videoUrl,
    });

    await video.save();

    return res.status(201).json({
      message: 'Video uploaded successfully',
      videoUrl: videoUrl,
      videoId: video._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
