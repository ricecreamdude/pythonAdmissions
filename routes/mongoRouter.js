let express = require('express');
let router = express.Router();
let mongo = require('mongodb');

var fs = require('fs');
const csv = require('csv-parser');

//./public/data/pokemon.csv
let pokeArray = [];

fs.createReadStream('./public/data/pokemon.csv')
  .pipe( csv() )
  .on('data', (row) => {
    console.log(row)
    pokeArray.push(row)
  })
  .on('end', () => {
    console.log('CSV File successfully processed');
  });

router.get('/', (req, res, next) => {

  //Print out some data from the CSV file here:
  res.send( pokeArray.splice(0,151) );
  next();  
  
});

module.exports = router;