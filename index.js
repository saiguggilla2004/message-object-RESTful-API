const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose")
const chat=require("./models/chat");
const { rmSync } = require("fs");
const methodOverride=require("method-override");

let port=3000;
main()
.then((res)=>{
    console.log("connection succesful")
})
.catch((err)=>{
    console.log(err);
})
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"));
app.listen(port,()=>{
    console.log("litening to the port "+port);
})
app.use(express.static(path.join(__dirname,"public")));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let chat1=new chat({
  from:"sai guggilla",
  to:"deekshitha",
  message:"how are you!!",
  created_at:new Date
})
// chat1.save()
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })

app.get("/",(req,res)=>{
    console.log("request is accepted");
    res.send("this is the sample response");
})

app.get("/chats",async (req,res)=>{
     
   let chats= await chat.find();
   res.render("index.ejs",{chats});
})
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
    // res.send("you will get a form  here..")
})
app.post("/chats",(req,res)=>{
    let {from,message,to}=req.body;
    let newChat=new chat({
        from:from,
        to:to,
        message:message,
        created_at:new Date()
    });
    newChat.save()
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats");
    console.log(newChat);
})

app.get("/chats/:id/edit",async (req,res)=>{
    // res.send("you will get a edit form over here");
    let {id}=req.params;
    let oldchat=await chat.findById(id);
    res.render("edit.ejs",{oldchat});
})

app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {message:newMsg}=req.body;
    let updatedChat=await chat.findByIdAndUpdate(id,{message:newMsg});
    console.log(updatedChat);
    res.redirect("/chats")
   
})

app.get("/chats/:id/delete",(req,res)=>{
    let {id}=req.params;
    chat.findByIdAndDelete(id)
    .then((result)=>{
        res.redirect("/chats");
    })
    .catch((err)=>{
        res.send(err);
    })
})