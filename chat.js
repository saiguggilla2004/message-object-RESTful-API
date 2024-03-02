const mongoose=require("mongoose");
const chatSchema=new mongoose.Schema({
    from:{
        type:String
    },
    to:{
        type:String
    },
    message:{
        type:String,
        maxLength:50
    },
    created_at:{
        type:Date
    }
});

const chat=new mongoose.model("Chat",chatSchema);

module.exports=chat;
