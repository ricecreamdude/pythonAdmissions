const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');

const pokeRouter = require('./routes/pokeRouter');

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//Serve static files BEFORE adding routes
app.use(express.static('public'));

//Routes
// app.use('/mongo', mongoRouter);
app.use('/', pokeRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;