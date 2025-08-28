require('dotenv').config()
const express = require('express');
const app = express();
const routes = require('./routes');
const session = require('express-session')


const PORT = 3000;



app.set('view engine', 'ejs');
app.locals.isActive = function(current, target) {
    return current === target ? 'text-green-500 border-b-4 border-green-500' : 'text-gray-500 hover:text-green-500';
}
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'your-secret-key',
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