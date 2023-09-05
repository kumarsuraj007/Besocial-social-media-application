import mongoose from 'mongoose'

const chatSchema = mongoose.Schema({
members :{
    type: Array
}
},{timestamp: "true"})

export default mongoose.model("CHAT", chatSchema);