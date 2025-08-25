const express = require('express');
const app = express();
const routes = require('./routes');


const PORT = 3000;



app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));



app.use(routes);


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})