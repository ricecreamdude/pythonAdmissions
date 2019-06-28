var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')


//root = https://pokeapi.co/api/v2/

//id = https://pokeapi.co/api/v2/pokemon/1/
//name = https://pokeapi.co/api/v2/pokemon/name/



router.get('/', (req, res, next) => {
    // res.send('Hello world from Pug!');
    res.render('index', {
        name: "Hello welcome to Josh's Python 401 Pokedex form"
    }
    );
});

router.get('/:id', (req,res) => {

    let url = 'https://pokeapi.co/api/v2/pokemon/';
    let pokemonData;

    fetch(url + req.params.id) 
        .then( res => res.json())
        .then( data => {
            res.render('pokemon', {
                name: data.species.name,
                imgUrl: data.sprites.front_default
            })
        })
        .catch( err=>{
            pokemonData = 'There was an error with your request';
            res.send(pokemonData);
        })

    if(req.params.id > 151){
        res.send('Sorry, no pokemon with that ID');
    }





    // res.send('The id you requested is ' + req.params.id);
});

module.exports = router;