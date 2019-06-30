let express = require('express');
let router = express.Router();
<<<<<<< HEAD

var fs = require('fs');
const csv = require('csv-parser');

let pokeArray = [];

//Stream .csv data
fs.createReadStream('./public/data/pokemon.csv')
  .pipe( csv() )
  .on('data', (row) => {
    // console.log(row)
    pokeArray.push(row)
  })
  .on('end', () => {
    console.log('CSV File successfully processed');
  });

const dbUrl = "mongodb+srv://ho_admin:ww7zqlswbdHMiyg2@pokemondb-o61qa.mongodb.net/test?retryWrites=true&w=majority"
var db;
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
const client = new MongoClient(dbUrl, { useNewUrlParser: true });


//Connect to DB
client.connect(err => {
  if (err) console.log(err);
  const db = client.db("pokemon");
  console.log('connected to database')
  // perform actions on the collection object
  client.close();
});
  

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



//Routes (/mongo)
router.get('/', (req, res, next) => {

  let array = pokeArray.splice(0,151)
  //Print out some data from the CSV file here:
  res.json( array[3] );
  
});

module.exports = router;