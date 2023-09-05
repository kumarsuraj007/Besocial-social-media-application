import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
chatId :{
    type: String
},
senderId :{
    type: String
},
text :{
    type: String
}
},{timestamp: "true"})

export default mongoose.model("MESSAGES", messageSchema);