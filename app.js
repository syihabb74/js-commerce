require('dotenv').config()
const express = require('express');
const app = express();
const routes = require('./routes');
const session = require('express-session')


const PORT = 3000;



app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'confidential',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        sameSite: true
    }
}))

app.use(routes);


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})