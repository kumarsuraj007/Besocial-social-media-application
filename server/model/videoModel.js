import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: String,
  body: String,
  video: String,
  postedBy:{
    type: mongoose.Types.ObjectId,
    ref: 'USER'
},
});

const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);

export default Video;
