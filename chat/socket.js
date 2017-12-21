Chat = require('../models/chat-model')

module.exports = (io) => {

    clients = {}

    io.on('connection', (socket) => {

        //Get user
        console.log('a user connected to the socket');
        let userID = socket.request.session.passport.user;
        console.log("The users was id",userID)

        clients[userID] = socket.id
        //Get all chat history where users ID matches sender id and
        Chat.find({senderID:userID},function(data){
            io.to(socket.id).emit("chatHistory",data)
        })

        //Get sender id
        socket.on('message', function (message) {

            let user = socket.request.session.passport.user;
            message.senderID = userID
            message.time = Date.now()
            
            io.to(clients[message.receiverID]).emit("chat message",message)
            io.to(clients[message.senderID]).emit("chat message",message)

            Chat.findOne({ 
                senderID:message.senderID ,
                receiverID:message.receiverID
            }).then( (chat) => {
                chat.messages.push(message)
                chat.save()
            }).catch( e =>{
                console.log(e)
            })
        });

        socket.on('disconnect', () => console.log('a user left us'));

    });
}