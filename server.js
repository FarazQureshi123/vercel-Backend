require('dotenv').config();
const app = require('./src/app');
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require("./src/service/ai.service");

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET','POST']
    }
});



io.on("connection",(socket)=>{
    console.log("A user is connected")

    const chatHistory = [];


    socket.on("disconnect",()=>{
        console.log("A user is disconnected");
    })

    socket.on("ai-message",async (data)=>{
       
        chatHistory.push({
            role:"user",
            parts:[{text:data.prompt}]
        });
        const response = await generateResponse(chatHistory);
        chatHistory.push({
            role:"model",
            parts:[{text:response}]
        })
        console.log("Ai response",response);
        socket.emit("ai-message-response",{response});
    })
})




httpServer.listen(3000,(req,res)=>{
    console.log("server is running on port 3000");
})