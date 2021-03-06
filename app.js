const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

//매일매일 실행할 작업
// const scheduler = require('./module/schdule');

//광고 주기적으로 전송
// const schedulerAd = require('./module/scheduleAd');

const indexRouter = require('./routes/index');

const app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware - logger
app.use(logger('dev'));
//middleware - body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//middleware - cookie-parser
app.use(cookieParser());
//middleware - static
app.use(express.static(path.join(__dirname, 'public')));
//cors
app.use(cors());
//헬멧모듈
app.use(helmet());

app.use((req, res, next) => {
  console.log("query", req.query);
  console.log("body", req.body);
  console.log("params", req.params);
  next()
});

app.use('/', indexRouter);

//catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

//middleware - error-handler
app.use((err, req, res, next) => {
  //set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  //render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
