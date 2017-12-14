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
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,logintoken,userid");
    // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE");
    // res.header("X-Powered-By", ' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8");
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

app.post('/api/deleteWork', function (req, res) {
  if (req.body.token) {
    const workId = req.body.workId;

    if (workId === 'she') {
      res.send({
        errorCode: 2000,
        errorMessage: '不存在的作品id',
        data: null
      });
    } else {
      res.send({
        errorCode: 0,
        errorMessage: '',
        data: {
          workId
        }
      });
    }

  } else {
    res.send({
      errorCode: 1000,
      errorMessage: '请先登录',
      data: null
    });
  }
});

app.post('/api/getWorks', function (req, res) {
  if (req.body.token) {
    const current = req.body.current;
    const pageSize = req.body.pageSize;
    const total = 55;
    const pages = Math.ceil(total / pageSize);
    let works = [];
    //
    // if (current > pages) {
    //   return res.send({
    //     errorCode: 0,
    //     errorMessage: '',
    //     data: {
    //       works: []
    //     }
    //   });
    // } else {
      let work = null;

      for (var i = 0; i < total; i++) {
        let workId = i;
        work = {
          id: workId,
          name: `作品${ workId }`,
          status: 1,
          config: {
            materials: [],
            scenes: []
          }
        };

        for (var j = 0; j < 14; j++) {
          work.config.scenes.push({
            id: j,
            type: 'roto',
            material_id: j,
            thumbnail: 'xxx.jpg'
          });
          work.config.materials.push({
            id: j,
            type: j % 2 == 0 ? 'video' : 'image',
            status: 'uploaded',
            local_path: '',
            path: '',
            name: `素材${ j }`,
            thumbnail: 'http://pic36.photophoto.cn/20150704/0035035577200162_b.jpg',
            properties: {
              length: 1500,
              time: 50,
              encoding: 'mp4',
              thumbnail: 'thumb.jpg',
              frames: ['1.jpg', '2.jpg']
            }
          });
        }

        works.push(work);
      }

      return res.send({
        errorCode: 0,
        errorMessage: '',
        data: {
          works
        }
      });
    //}
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
