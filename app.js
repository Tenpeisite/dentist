var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var fs = require('fs');
var sql = require('./conf/mysql.js');
var app = express();
var path = require("path");

var login = require('./app/routes/login');
var logout = require('./app/routes/logout');
var index = require('./app/routes/index');

app.use(logger('dev'));
 app.use(session({
   resave: false,
   saveUninitialized: true,
  secret: 'dentist',
  cookie:{
      maxAge: 600*1000,
      //secure: false
  }
}));

app.set('view engine','ejs');
app.set('views','./app/views/');
app.use('/static', express.static('./app/public'))

app.use(bodyParser.urlencoded({ extended: false }));

// display userList as main page
// app.get('/main',function(req,res){
//         sql.query('select * from user',function(err,result){
//           if (err) {
//             res.render('index',{title:"用户列表",datas:[]});
//           }else{
//             res.render('index',{title:"用户列表",datas:result});
//           }
//         });
// });
app.use('/', login);
app.use('/login', login);
app.use('/logout', logout);
app.use('/index', index);
// app.get('/login',function(req,res){
//     res.render('login');
// });
// add user
app.get('/add',function(req,res){
  res.render('add');
});

//login
// app.post('/login',function(req,res){
//     var name = req.body.name;
//     var password = req.body.password;
//     sql.query('select* from user where name='+'"'+name+'"'+'and password='+'"'+password+'"',function(err,result){
//         console.log(result);
//         if(err){
//             res.send('登录失败'+err);
//         }else if(result.length){
//             console.log("found customer: ", result);
//             res.redirect('/');
//         }else{
//             console.log('no such user');
//         }
//     });
// });

//logOut
// app.get('/logOut',function(req,res){
//   console.log(req.session.name);
//   req.session.destroy();
//   res.redirect("http://localhost:3000/login");			//删除成功后转到百度页面
// })

app.post('/add',function(req,res){
  var name = req.body.name;
  var password = req.body.password;
  var 工号 = req.body.工号;
  var sex = req.body.sex;
  var 职务 = req.body.职务;
  var 出生年份 = req.body.出生年份;
  var 出生月份 = req.body.出生月份;
  sql.query('insert into user(name,password,employNumber,sex,title,yearOfBirth,monthOfBirth)\
              values("'+name+'","'+ password +'","'+ 工号 +'","'+ sex +'","'+ 职务 +'","'+ 出生年份 +'","'+ 出生月份 +'")',function(err,result){
     if(err){
            res.send('新增失败'+err);
        }else {
            res.redirect('/');
        }
  });
});

// edit user
app.get('/edit/:id',function(req,res){
    var id = req.params.id;
    sql.query('select * from user where id = ' + id,function(err,result){
            res.render('edit',{datas:result});
    });
});

app.post('/edit',function(req,res){
  var id = req.body.id;
  var name = req.body.name;
  var password = req.body.password;
  var 工号 = req.body.employNumber;
  var sex = req.body.sex;
  var 职务 = req.body.职务;
  var 出生年份 = req.body.yearOfBirth;
  var 出生月份 = req.body.monthOfBirth;
  sql.query('update user set name = "'+name+'"  , password = "'+password+'" , employNumber = "'+工号+'" , sex = "'+sex+'", \
  title = "'+职务+'", yearOfBirth = "'+出生年份+'" , monthOfBirth = "'+出生月份+'" where id = '+id,function(err,result){
    if (err) {
      res.send('更新失败'+err);
    }else{
      res.redirect('/');
    }
  })

});


// del user
app.get('/del/:id',function(req,res){
  var id = req.params.id;
  sql.query('delete from user where id = '+id,function(err,result){
     if(err){
            res.send('删除失败'+err);
        }else {
            res.redirect('/');
        }
  });
});

app.listen(3000,function(){
  console.log('listening on port 3000!')
});