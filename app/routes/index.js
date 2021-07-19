var express = require('express');
var router = express.Router();
var sql = require('../../conf/mysql.js');

router.get('/', function(req, res, next) {

    var user = req.session.user;
    console.log('session name:'+user);
    if(user=="admin"){
        sql.query('select * from user',function(err,result){
            if (err) {
                res.render('adminIndex',{title:"用户列表",datas:[]});
            }else{
                res.render('adminIndex',{title:"用户列表",datas:result});
            }
        });
    }else{
        sql.query('select * from user where name='+'"'+user+'"',function(err,result){
            if (err) {
                res.render('index',{title:"用户列表",datas:[]});
            }else{
                res.render('index',{title:"用户列表",datas:result});
            }
        });
    }
    
    console.log(user);
});

module.exports = router;
