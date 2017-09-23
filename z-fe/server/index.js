var express = require('express');
var bodyParser=require('body-parser')
var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(express.static(__dirname + '/public'));
var userInfo={
    'name':'asldfk',
    'id':"1234567"
}
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,logintoken,userid");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.post('/login',function (req, res) {
    if(req.body.pwd==123){
        userInfo.name=req.body.name;
        res.send({data:{'id':"1234567",loginToken:"asdfsdfasdfas",name:userInfo.name},status:0});
    }else{
        res.send({msg:"密码错误",status:2});
    }

})
app.post('/register',function (req, res) {
    console.log(req);
    res.send(userInfo);
})
app.get('/userinfo',function (req, res) {

    setTimeout(()=>{
        console.log(req.headers.logintoken);
        if(req.headers.logintoken){
            res.send(Object.assign({status:0},{data:userInfo}));
        }else{
            res.send({msg:"login is not valid",status:1});
        }

    },1000)

})
app.post('/updateuser',function (req, res) {
    Object.assign(userInfo,req.body)
    res.send(Object.assign({status:0},{data:userInfo}));
})
app.get('/worklist',function (req, res) {

setTimeout(()=>{
    var list=[]
    var page=+req.query.page;
    var counts=+req.query.limit;
    for(var i=1;i<counts+1;i++){
        list.push({itemNo:page*counts+i})
    }
    res.send(Object.assign({status:0},{data:{list,total:400}}));
},500)

})
app.listen(3002,function (err) {
    if(!err){
        console.log('listen on port ',3002)
    }
});