require('dotenv').config({path : '../config/.env'});
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

const userApi = require('./router/user.api');
const groupApi = require('./router/groupe.api');
const questionApi = require('./router/admin.api');
const answerApi = require('./router/answer.api');

// middlewers
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// use userRouter
app.use('/', userApi);
app.use('/', groupApi);
app.use('/', questionApi);
app.use('/', answerApi);

const connection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    });
    console.log('connected to database');
  } catch (err) {
    console.log(err);
  }
};
connection();

// port
const PORT = process.env.PORT;

// start server
app.listen(PORT, () => {
  console.log(`server runing at ${PORT}`);
});
