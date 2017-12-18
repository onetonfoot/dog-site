User = require('../models/user-model')

module.exports = (io) => { 
    
       io.on('connection', (socket) => { 
    
           console.log(`Someone connected to the socket`); 
           let user_id  = socket.request.session.passport.user // Now it's available from Socket.IO sockets too! Win!
           User.findOne({_id : user_id}).then(  u =>{
            console.log(u)
           })

           socket.on('disconnect', () => { 
               console.log('a user left') 
           }) 
    
       }); 
   } 