const app = require('./app')
require('dotenv').config()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: "*"} } )

const messages = []
io.on('connection', socket=>{
  console.log(`socket conectado ${socket.id}`)
  
  socket.emit('previousMessages', messages)

  socket.on('sendMessage', data=>{
    messages.push(data)
    socket.broadcast.emit('receivedMessage', data)
  })
})
const port = process.env.PORT || 3000
server.listen(port, ()=>console.log(`server listening in port: ${port}`))