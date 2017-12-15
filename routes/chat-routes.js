
// const router = require('express').Router()
const router = require('./auth-routes')



router.get('/inbox',router.authCheck , (req,res)=>{

    res.render('inbox')

})


module.exports = router
