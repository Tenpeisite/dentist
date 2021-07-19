var express = require("express");
var router = express.Router();
var sql = require('../../conf/mysql.js');
//var mongoose = require('mongoose');

/* GET login page*/
router.get('/', function (req, res, next) {
    var user = req.session.user;
    res.render('login', {user:user});
    //res.render("login");
});

// app.get('/login',function(req,res){
//     res.render('login');
// });
/* Receive data of username and password */
router.post('/', function (req, res, next) {
    var username = req.body.name;
    var password = req.body.password;

    if(!username || !password){
        res.send('<p>Please Input Username and Password</p>');
        //console.log("Error!");
        return;
    }
    /* Connect with DB, and validate information */
    sql.query('select* from user where name='+'"'+username+'"'+'and password='+'"'+password+'"',function(err,result){
        console.log(result);
        if(err){
            res.send('登录失败'+err);
        }else if(result.length){
            console.log("found user: ", result);
            req.session.user = username;
            console.log("session input: "+req.session.user);
            res.redirect('/index');
            return;
        }else{
            res.send('<p>Can not find such user, please register.</p>');
            console.log('no such user, please register.');
        }
    });
});

module.exports = router;