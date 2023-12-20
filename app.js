const express=require('express')
const app=express()
const socketio = require('socket.io');
const PORT = process.env.PORT || 3000;
const server=app.listen(PORT,()=>{
    console.log(`listining on ${PORT}`)
})
let totalSockets=new Set();
app.use(express.static('public'))
const io = socketio(server)
io.on('connection', onconnection)

function onconnection(socket){
    console.log(socket.id)
    totalSockets.add(socket.id)
    io.emit('total',totalSockets.size)
    
    socket.on('disconnect',()=>{
        console.log('d',socket.id)
        totalSockets.delete(socket.id)
        io.emit('total',totalSockets.size)
    })
    socket.on('message',(value)=>{
        console.log(value)
        socket.broadcast.emit('chatting',value)
    })
    socket.on('type',(data)=>{
        console.log(data.name);
        socket.broadcast.emit('start',data)
    })
}
