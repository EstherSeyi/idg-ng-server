var createError = require('http-errors');
import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import dbConnection from './config/dbconnection';

var logger = require('morgan');
const MongoStore = require('connect-mongo')(session);

import loginRouter from './routes/auth';

const IN_PROD = process.env.NODE_ENV === 'production';

var app = express();

dbConnection();

var whitelist = [
  'https://peaceful-mcclintock-c091dd.netlify.com',
  'http://localhost:3000',
];
var corsOptionsDelegate = function(req: any, callback: any) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// Setup Request logging
const logFormat = IN_PROD ? 'combined' : 'dev';

app.use(
  morgan(logFormat, {
    skip: function(_req, res) {
      if (process.env.NODE_ENV === 'test') {
        return true;
      }

      return res.statusCode < 400;
    },
    stream: process.stderr,
  }),
);

app.use(
  morgan(logFormat, {
    skip: function(_req, res) {
      if (process.env.NODE_ENV === 'test') {
        return true;
      }

      return res.statusCode >= 400;
    },
    stream: process.stdout,
  }),
);

app.disable('x-powered-by');
app.use(
  session({
    store: new MongoStore({
      url: process.env.MONGO_URL,
      ttl: 14 * 24 * 60 * 60,
    }),
    name: 'idp-sesh',
    secret: `${process.env.SESSION_SECRET}`,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      sameSite: 'none',
      httpOnly: true,
      secure: IN_PROD,
    },
  }),
);
app.use(compression());
app.use(cors(corsOptionsDelegate));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes here
app.get('/', (_req, res) => res.json('hello world'));
app.use('/auth', loginRouter);

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
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
