var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var config = require('config');

var bunyan = require('bunyan');
global.log = bunyan.createLogger({name: "factory-management-api"});

//
var jwt = require('jsonwebtoken');
app.set('superSecret', config.secret);

// Connect Db
var initDb = require('./app/db/init.js');
initDb();

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

var router = express.Router();

router.get('/', function(req, res){
  res.json({'message':'hurreh! Welcome to API!'})
})

app.use('/api', require('./app/controllers/AuthController'));

app.use(function(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token){
    jwt.verify(token, app.get('superSecret'), function(err, decoded){
      if(err){
        return res.json({
          success: false, message: 'Failed to authenticate token.'
        })
      }else{
        req.decoded = decoded;
        next();
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'token please'
    })
  }
});

app.use('/api', require('./app/controllers/ContactController'));
app.use('/api', require('./app/controllers/UserController'));

var port = process.env.PORT || config.get('port');
app.listen(port)
console.log('Server started at ', port);
