const express = require('express');
const app = express();
const port = 3000;

const indexRouter = require('./routes/index');

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//Serve static files BEFORE adding routes
app.use(express.static('public'));

//Create a route to serve index page
app.use('/', indexRouter);



// app.get('/', (req, res) => res.send('Hello World!'));



app.listen(port, () => console.log(`Example app listening on port ${port}!`));


module.exports = app;