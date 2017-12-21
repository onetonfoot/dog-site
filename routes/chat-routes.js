const Chat = require("../models/chat-model")
const User = require("../models/user-model")
const mongoose = require('mongoose')
const router = require('./auth-routes')



router.get('/inbox',router.authCheck , (req,res)=>{

    Chat.find().then( allChats =>{
        console.log(allChats)
        res.render('inbox',{allChats:allChats})
    })

})


router.get('/inbox/:receiverID',router.authCheck , (req,res)=>{

    res.render('inbox')

})


router.get('/history',(req,res)=>{

    Chat.find().then( allChats =>{
        res.json(allChats)
    })

})



router.post('/inbox',(req,res)=>{

    Chat.findOne({
        senderID: req.user._id,
        receiverID: req.body.ownerID,
    }) .then(data => {
        if (data == null){
            //If they have not spoken create anew message
            User.findOne({_id: req.body.ownerID}).then(owner=>{
                Chat({
                    senderID: req.user._id,
                    senderName: req.user.username,
                    receiverID: req.body.ownerID,
                    receiverName: owner.username,
                    messages: [],
                }).save()
            }).catch(e =>{
                console.log(e)
            })
        }
        res.send("ok")
        console.log("Post",data)
    }).catch(e =>{
        console.log(e)
    })

})

module.exports = router
