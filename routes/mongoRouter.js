let express = require('express');
let router = express.Router();

var fs = require('fs');
const csv = require('csv-parser');

let pokeArray = [];

//Create a pokemon mongo document constructor
function createPokemon(_id, name, classification, type1, type2, hp, attack, defense, speed, sp_attack, sp_defense){
  return {
    "_id": _id,
    "name": name,
    "classification": classification,
    "type1": type1,
    "type2": type2,
    "stats": {
      "hp": hp,
      "attack": attack,
      "defense": defense,
      "speed": speed,
      "sp_attack": sp_attack,
      "sp_defense": sp_defense
    }
  }

}


//Stream .csv data
// fs.createReadStream('./public/data/pokemon.csv')
//   .pipe( csv() )
//   .on('data', (row) => {

//     // if (row.pokedex_number === "1"){
//     //   console.log(row);
//     // }
//     // console.log(row);
//     let newPokemon = createPokemon(
//       row.pokedex_number,
//       row.name,
//       row.classfication,
//       row.type1,
//       row.type2,
//       row.hp,
//       row.attack,
//       row.defense,
//       row.speed,
//       row.sp_attack,
//       row.sp_defense
//     )
//     //Populate internal array with pokemon data ready to push to Mongo
//     pokeArray.push(newPokemon)
//   })
//   .on('end', () => {
//     console.log('CSV File successfully processed');
//   });

//Connect to database
const dbUrl = "mongodb+srv://ho_admin:ww7zqlswbdHMiyg2@pokemondb-o61qa.mongodb.net/test?retryWrites=true&w=majority"
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
const client = new MongoClient(dbUrl, { useNewUrlParser: true });

  
//Routes (/mongo)
router.get('/', (req, res, next) => {

  let array = pokeArray.splice(0,151)
  //Print out some data from the CSV file here:
  res.json( array[3] );
  
});


//Create a mongo GET method that produces data for the template to display
router.get('/setup', (req, res, next) => {

  client.connect(err => {
    const db = client.db("test");
    if (err) console.log(err);
    console.log('connected to database')

    // using InsertMany, push pokemon document entires to database
    db.collection('appPokemon').insertMany(pokeArray, (err, res) =>{
      if (err) throw err;
      console.log(res);
      client.close();
    })
  });

  res.send('Added pokemon data to MongoDB');
});

//Delete all pokemon data from 'appPokemon' collection - abstracted away from original function
//to keep code easier to read
router.get('/delete', (req, res, next) => {

  client.connect(err => {
    const db = client.db("test");
    if (err) console.log(err);
    console.log('connected to database')

    //empty existing information
    db.collection('appPokemon').remove( {} );
    client.close();
  });

  res.send('Deleted data from colleciton "appPokemon" ');

})

module.exports = router;