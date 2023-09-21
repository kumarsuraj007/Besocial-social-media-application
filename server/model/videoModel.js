import mongoose from 'mongoose'

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Video', videoSchema);

// module.exports = Video;
