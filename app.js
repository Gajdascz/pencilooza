import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import createDebug from 'debug';
import { configDotenv } from 'dotenv';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import inventoryRouter from './routes/inventory.js';

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
app.use('/users', usersRouter);
app.use('/inventory', inventoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.render('404', {});
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
export default app;
