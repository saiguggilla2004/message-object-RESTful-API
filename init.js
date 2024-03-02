const mongoose=require("mongoose")
const chat=require("./models/chat.js");
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
main()
.then((res)=>{
    console.log("connection succesful")
})
.catch((err)=>{
    console.log(err);
})
let chats=[
    {
        from:"sai",
    to:"rani",
message:"hello",
created_at:new Date()    },
    {
        from:"rani",
        to:"sai",
    message:"hiiiiii",
    created_at:new Date() 
    }
];

chat.insertMany(chats)
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err)
})