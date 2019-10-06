require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const helmet = require('helmet');
const PORT = process.env.PORT || 8080;

const mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Connected to the database'));

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, expires: 3600, httpOnly: false },
    unset: 'destroy'
  }),
);
app.use(helmet());

const mealsRouter = require('./routes/meals');
app.use('/', mealsRouter);

const commentsRouter = require('./routes/comments');
app.use('/', commentsRouter)

const usersRouter = require('./routes/users');
app.use('/', usersRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
