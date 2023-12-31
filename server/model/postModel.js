import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    photo: {
        type: String,
        required:true,
        default: false
    },

    postedBy:{
        type: mongoose.Types.ObjectId,
        ref: 'USER'
    },

    likes:[{
        type: mongoose.Types.ObjectId,
        ref: 'USER'
    }],

    comments:[{
        text: String,
        postedBy:{type: mongoose.Types.ObjectId, ref: 'USER'}
    }]
},{timestamps: true})

export default mongoose.model("POST", postSchema);