const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        res.redirect('/auth/login');
    }
};

router.get('/', authCheck, (req, res) => {
    res.render('home');
});

module.exports = router;
