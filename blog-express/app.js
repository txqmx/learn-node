var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');  // 解析cookie, req.cookie = {}
var logger = require('morgan'); // 记录日志
const session = require('express-session'); // 解析session
const RedisStore = require('connect-redis')(session); // 接入redis

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express(); // 初始化app实例

// view engine setup 视图引擎设置
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

const ENV = process.env.NODE_ENV
if(ENV !== 'production'){
    app.use(logger('dev')); // 日志在控制台打印
} else {
    const logFileName = path.join(__dirname, 'logs', 'access.log')
    const writeStream = fs.createWriteStream(logFileName, {
        flags: 'a'
    })
    app.use(logger('combined',{
        // stream: process.stdout // 默认,打印在控制台
        stream: writeStream
    })); // morgan的几种日志格式
}

app.use(express.json()); // postData处理,json格式 req.body = {}
app.use(express.urlencoded({ extended: false })); // postData处理 其他格式
app.use(cookieParser()); // 解析cookie  req.cookie = {}
// app.use(express.static(path.join(__dirname, 'public')));  // 静态文件返回

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
    client: redisClient
})

app.use(session({
    secret: 'WJiol_#123',
    cookie: {
      path: '/', // 默认
      httpOnly: true, // 默认
      maxAge: 24*60*60*1000
    },
    store: sessionStore
})); // req.session = {}

// app.use('/', indexRouter); // 注册路由
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
