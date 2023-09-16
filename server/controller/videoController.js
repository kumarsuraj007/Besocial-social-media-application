import asyncHandler from 'express-async-handler';
import multer from 'multer';
import path from 'path';
import videoSchema from '../model/videoModel.js';

// Multer setup for video uploads
const storage = multer.diskStorage({
  destination: './uploads/videos',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Upload a video
export const uploadVideo = asyncHandler(upload.single('video'), async (req, res) => {
  const { title, body, video } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: 'No video file uploaded' });
  }

  try {
    // Create a new video document in MongoDB
    const newVideo = await videoSchema.create({
      title,
      body,
      video: req.file.filename,
    });
    res.status(201).json({ message: 'Video uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
