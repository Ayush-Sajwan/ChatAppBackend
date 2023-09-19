const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const socket=require('socket.io');
const app=express();

app.use(cors());
app.use(express.json());


require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Successfully connected to the database");
})
.catch((err)=>{
    console.log(`${err} occurred could not connect to database`);
})


app.use("/api/auth",require("./routes/userRoutes"));
app.use("/api/message",require("./routes/messagesRoutes"));

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`);
})




const io=socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentails:true
    }
});

global.onlineUsers=new Map();

io.on('connection',(socket)=>{
    global.socket=socket;

    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    })

    socket.on("send-msg",(data)=>{
        const receiverSocket=onlineUsers.get(data.to);
        if(receiverSocket){    
            socket.to(receiverSocket).emit("receive-msg",data.msg);
        }
    })
})