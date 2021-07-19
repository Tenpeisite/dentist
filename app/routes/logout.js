var express = require("express");
var router = express.Router();
//var sql = require('../../conf/mysql.js');
router.get('/', function (req, res, next) {
    if(req.session.user){
        delete req.session.user;
    }
    res.redirect('/login');
    return;
});
module.exports = router;