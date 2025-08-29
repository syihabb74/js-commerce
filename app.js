require('dotenv').config()
const express = require('express');
const app = express();
const routes = require('./routes');
const session = require('express-session')
const PORT = 3000;

app.set('view engine', 'ejs');
app.locals.isActive = function (current, target) {
  return current === target ? 'text-green-500 border-b-4 border-green-500' : 'text-gray-500 hover:text-green-500';
}
app.locals.isChoose = function (current, target) {
  return current === target ? 'text-white bg-red-500 rounded-r-full' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100';
}
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'syihab',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))

app.use('/', routes);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})