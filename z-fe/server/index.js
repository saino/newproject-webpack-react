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


app.post('/api/auth/login', function (req, res) {
    if (req.body.password == 123) {
        res.send({
          errorCode: 0,
          errorMessage: '',
          data: {
            token: '123AAA456BBB',
            expired: Date.now() +  24 * 3600000
          }
        });
    } else {
      res.send({
        errorCode: 3000,
        errorMessage: '手机号或密码错误',
        data: null
      });
    }
});

app.post('/api/getWorks', function (req, res) {
  if (req.body.token) {
    const curr = req.body.curr;
    const pageSize = req.body.pageSize;
    const total = 55;
    const pages = Math.ceil(total / pageSize);
    let works = [];

    if (curr > pages) {
      return res.send({
        errorCode: 0,
        errorMessage: '',
        data: {
          works: [],
          totalPages: 10
        }
      });
    } else {

      for (var i = 0; i < pageSize && (curr*pageSize+i) < total; i++) {
        works.push({
          workId: '' + curr + i,
          title: '作品作品',
          thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512217642613&di=0909a39925c095e9f289f99f33aad1f8&imgtype=0&src=http%3A%2F%2Fupload.mnw.cn%2F2017%2F0814%2F1502698443378.jpg',
        });
      }

      return res.send({
        errorCode: 0,
        errorMessage: '',
        data: {
          works,
          total
        }
      });
    }
  }

  res.send({
    errorCode: 1000,
    errorMessage: '请先登录',
    data: null
  });
});

app.post('/api/auth/currUser', function (req, res) {
  if (req.body.token) {
    return res.send({
      errorCode: 0,
      errorMessage: '',
      data: {
        usernick: '致戎科技',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
      }
    });
  }

  res.send({
    errorCode: 1000,
    errorMessage: '请先登录',
    data: null
  });
});

app.post('/api/auth/register', function (req, res) {
  if (req.body.phone == 123) {
      res.send({
        errorCode: 1000,
        errorMessage: '手机号已存在',
        data: null
      });
  } else {
    res.send({
      errorCode: 0,
      errorMessage: '',
      data: {
        token: '123AAA456BBB',
        expired: Date.now() + 3600000
      }
    });
  }
});

app.post('/')

app.post('/api/scenes', function (req, res) {
  var materialId = req.body.materialId;
  var sceneId = 1;

  res.send({
    errorCode: 0,
    errorMessage: '',
    data: [{
      materialId: materialId,
      sceneId: sceneId++,
      text: '固定广告植入'
    }, {
      materialId: materialId,
      sceneId: sceneId++,
      text: '固定广告植入'
    }, {
      materialId: materialId,
      sceneId: sceneId++,
      text: '固定广告植入'
    }]
  });
});

















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
