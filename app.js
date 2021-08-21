import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import usersRouter from './routes/users.js';
import { sequelize } from './db/database.js';
import { config } from './config.js';
import { getAll } from './data/user.js';

const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.sendStatus(404);
});

// error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

sequelize.sync().then(() => {
  getAll().then(users => console.log(users));
  app.listen(config.host.port);
});

export default app;
