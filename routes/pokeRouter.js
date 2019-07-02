var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

const dbUrl = "mongodb+srv://ho_admin:ww7zqlswbdHMiyg2@pokemondb-o61qa.mongodb.net/test?retryWrites=true&w=majority"
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
const client = new MongoClient(dbUrl, { useNewUrlParser: true });

router.get('/', (req, res, next) => {
    res.render('index', {
    name: "Hello welcome to Josh's Python 401 Application App"
    });
});

router.get('/:id', (req, res, next) => {

    let url = 'https://pokeapi.co/api/v2/pokemon/';
    let pokemonData;

    if(req.params.id > 151){
        res.send('Sorry, no pokemon with that ID');
    }
    
    //Pokemon API 
    fetch(url + req.params.id) 
        .then( res => res.json())
        .then( data => {
            //Connect to database
            let pokemon;
            client.connect(err => {
                const db = client.db("test");
                if(err) throw err
                
                db.collection('appPokemon').findOne({_id: req.params.id.toString()}, (err, result) => {
                    if (err) throw err;
                    pokemon = result;
                    
                    res.render('pokemon', {
                        name: data.species.name,
                        imgUrl: data.sprites.front_default,
                        classification: pokemon.classification,
                        type1: pokemon.type1,
                        type2: pokemon.type2,
                        hp: pokemon.stats.hp,
                        attack: pokemon.stats.attack,
                        defense: pokemon.stats.defense,
                        speed: pokemon.stats.speed,
                        sp_attack: pokemon.stats.sp_attack,
                        sp_defense: pokemon.stats.sp_defense
                    })
                });
            });
            //Send information to template
        })
        .catch( err=>{
            res.send('There was an error with your request in router.get');
        })
});

module.exports = router;