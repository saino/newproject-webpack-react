var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(express.static(__dirname + '/public'));
var userInfo = {
    'name': 'asldfk',
    'id': "1234567"
}
var worklist = Array.apply(null, Array(100)).map(function (item, i) {
    return {itemNo: i};
});
// console.log(list);
app.all('*', function (req, res, next) {    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,logintoken,userid");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.post('/api/login', function (req, res) {
    if (req.body.password == 123) {
        res.send({
          errorCode: 0,
          errorMsg: '',
          data: {
            token: '123AAA456BBB',
            expired: Date.now() + 3600000
          }
        });
    } else {
      res.send({
        errorCode: 3000,
        errorMsg: '用户名或密码错误',
        data: null
      });
    }
})
app.post('/register', function (req, res) {
    console.log(req);
    res.send(userInfo);
})
app.get('/userinfo', function (req, res) {

    setTimeout(() => {
        console.log(req.headers.logintoken);
        if (req.headers.logintoken) {
            res.send(Object.assign({status: 0}, {data: userInfo}));
        } else {
            res.send({msg: "login is not valid", status: 1});
        }

    }, 1000)

})
app.post('/updateuser', function (req, res) {
    Object.assign(userInfo, req.body)
    res.send(Object.assign({status: 0}, {data: userInfo}));
})
app.delete('/worklist', function (req, res) {

    console.log(req.body);
    var page = +req.body.page;
    var counts = +req.body.limit;
    var index = page * counts + parseInt(req.body.index);
    console.log(index);
    worklist.splice(index, 1)
    res.send(Object.assign({status: 0}, {data: userInfo}));
})
app.get('/worklist', function (req, res) {
    setTimeout(() => {
        var list = []
        var page = +req.query.page;
        var counts = +req.query.limit;
        var start = page * counts;
        for (var i = 0; i < counts; i++) {
            if (start + i > worklist.length) {
                break
            }
            list.push(worklist[start + i])
        }
        res.send(Object.assign({status: 0}, {data: {list, total: worklist.length}}));
    }, 500)

})
app.listen(3002, function (err) {
    if (!err) {
        console.log('listen on port ', 3002)
    }
});
