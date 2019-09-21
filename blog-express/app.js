var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');  // 解析cookie, req.cookie = {}
var logger = require('morgan'); // 记录日志

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express(); // 初始化app实例

// view engine setup 视图引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json()); // postData处理,json格式 req.body = {}
app.use(express.urlencoded({ extended: false })); // postData处理 其他格式
app.use(cookieParser()); // 解析cookie  req.cookie = {}
// app.use(express.static(path.join(__dirname, 'public')));  // 静态文件返回

app.use('/', indexRouter); // 注册路由
app.use('/users', usersRouter);
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
