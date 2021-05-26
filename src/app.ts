import createError, { HttpError } from 'http-errors';
import express, {Request, Response, NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/usersPost';
import signupRouter from './routes/signup';
import loginRouter from './routes/login';
import usersPost from './routes/usersPost';
import usersGet from './routes/usersGet';
import usersGetOne from './routes/usersGetOne';
import usersUpdate from './routes/usersUpdate';
import usersDelete from './routes/usersDelete';

import { connectDB } from "./database/dbconnection";
import {testConnectDB} from "./database/testDBConnection";

var app = express();

// view engine setup
app.set('views', path.join(__dirname,'../', 'views'));
app.set('view engine', 'jade');

if (process.env.NODE_ENV === "test") {
  testConnectDB();
} else {
  connectDB();
}
  

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/users/post', usersPost);
app.use('/users/get', usersGet);
app.use('/users/getone', usersGetOne);
app.use('/users/update/', usersUpdate);
app.use('/users/delete', usersDelete);


// catch 404 and forward to error handler
app.use(function(req:Request, res:Response, next:NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err:HttpError, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
