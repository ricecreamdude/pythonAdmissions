var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    // res.send('Hello world from Pug!');
    res.render('index');
});

router.get('/:id', (req,res) => {
    res.send('The id you requested is ' + req.params.id);
});

module.exports = router;