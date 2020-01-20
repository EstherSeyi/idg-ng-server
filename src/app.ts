var createError = require('http-errors');
import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';

import dbConnection from './config/dbconnection';
import { validateJWT } from './middleware/checkJwt';

import loginRouter from './routes/auth';
import aggregateRouter from './routes/total';
import candidatesRouter from './routes/candidates';
import familiesRouter from './routes/families';

const IN_PROD = process.env.NODE_ENV === 'production';

var app = express();

dbConnection();

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
app.use(compression());
app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes here
app.get('/', (_req, res) => res.json('hello world'));
app.use('/auth', loginRouter);
app.use(validateJWT);
app.use('/aggregate', aggregateRouter);
app.use('/candidates', candidatesRouter);
app.use('/families', familiesRouter);

app.use('*', (_req, res) =>
  res.status(404).json({ err: 'resource not found, check your url' }),
);

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
