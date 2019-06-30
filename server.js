const express = require('express');
const app = express();
const port = 3000;

const indexRouter = require('./routes/index');
const mongoRouter = require('./routes/mongoRouter');

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//Serve static files BEFORE adding routes
app.use(express.static('public'));

//Routes
app.use('/mongo', mongoRouter);
app.use('/', indexRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;