var createError = require('http-errors');
import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import cors from 'cors';
// var path = require('path');
var logger = require('morgan');

var app = express();
app.use(compression());
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes here

// catch 404 and forward to error handler
app.use(function(_req: Request, _res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
