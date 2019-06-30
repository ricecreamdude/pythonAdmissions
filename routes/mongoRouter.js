let express = require('express');
let router = express.Router();
// let mongo = require('mongodb');
let Papa = require('papaparse');

let csvUrl = "localhost:3000/data/pokemon.csv";

//localhost:3000/mongo
router.get('/', (req, res, next) => {

  let csv = Papa.parse(csvUrl, {
    complete: function(results) {
      console.log("Finished:", results.data);
      res.send(results.data);
      
    }
  });
  //Print out some data from the CSV file here:
  next();  
  
});

module.exports = router;