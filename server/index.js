require('dotenv').config();

const cors = require('cors');
const express = require('express');
const http = require('http');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('./passport');

const authRouter = require('./routes/auth');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout');
const coinsRouter = require('./routes/coins');

const app = express();

const {
  DB_USER,
  DB_PASS,
  DB_CLUSTER,
  DB_NAME,
  DB_URL,
} = process.env;

let mng;
const connect = async () => {
  if (!mng) {
    if (mongoose.connections[0].readyState) return;
    // Using new database connection
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
      process.exit(-1);
    });
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
    }
    mongoose.set('useCreateIndex', true);
    mng = await mongoose.connect(DB_URL, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  }
  return mng
};

connect().then(() => {
  console.log('Database connection successful');
}).catch((err) => {
  console.error('Database connection error: ', err);
});

//* Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* Express Session
app.use(session({
  secret: 'Crypto Counter',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

//* CORS Middleware
app.use(cors());

//* Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

const router = express.Router();

//* Routes
router.use('/auth', authRouter);
router.use('/register', registerRouter);
router.use('/logout', logoutRouter);
router.use('/coins', coinsRouter);
router.get('/hello', (req, res) => {
  res.send("Hello")
})

app.use('/.netlify/functions/api', router)
// const exitHandler = (options) => {
//   if (options.exit) process.exit();
// };

// // App is closing
// process.on('exit', exitHandler.bind(null, {
//   cleanup: true,
// }));

// // Catches ctrl+c event
// process.on('SIGINT', exitHandler.bind(null, {
//   exit: true,
// }));

// // Catches "kill pid" (for example: nodemon restart)
// process.on('SIGUSR1', exitHandler.bind(null, {
//   exit: true,
// }));

// process.on('SIGUSR2', exitHandler.bind(null, {
//   exit: true,
// }));

// // Catches uncaught exceptions
// process.on('uncaughtException', exitHandler.bind(null, {
//   exit: true,
// }));

module.exports = app