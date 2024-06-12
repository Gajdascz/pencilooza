import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import createDebug from 'debug';
import { configDotenv } from 'dotenv';

import indexRouter from './routes/index.js';
import registrationRouter from './routes/registration.js';
import manufacturerRouter from './routes/manufacturer.js';
import itemRouter from './routes/item.js';
import adminController from './controllers/admin/adminController.js';

configDotenv();
mongoose.set('strictQuery', false);

const app = express();
const __dirname = import.meta.dirname;
const debug = createDebug('pencilooza:app');
const main = async () => await mongoose.connect(process.env.MONGO_URL);
main().catch((err) => debug(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/registration', registrationRouter);
app.use('/manufacturer', manufacturerRouter);
app.use('/item', itemRouter);

app.post('/admin-command', adminController.authAndExecute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  switch (err.status) {
    case 404:
      return res.render(404, { err });
    default:
      return res.render('error');
  }
});
export default app;
