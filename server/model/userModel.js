import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "Please Enter Your Username!"],
        unique: true
    },

    email: {
        type: String,
        require: [true, "Please Enter Your Email!"]
    },

    password: {
        type: String,
        require: [true, "Please Enter Your Password!"]
    },
    photo: {
        type: String,
        require: true,
    },
}, {timestamps: true});

export default mongoose.model('USER', userSchema);
