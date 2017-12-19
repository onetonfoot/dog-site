module.exports = (io) => { 
    
       io.on('connection', (socket) => { 
    
           console.log(`Someone connected to the socket`); 
    
           socket.on('disconnect', () => { 
               console.log('a user left') 
           }) 
    
       }); 
   } 