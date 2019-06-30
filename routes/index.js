var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

router.get('/', (req, res, next) => {
        res.render('index', {
        name: "Hello welcome to Josh's Python 401 Pokedex form"
    });
});

router.get('/:id', (req, res, next) => {

    let url = 'https://pokeapi.co/api/v2/pokemon/';
    let pokemonData;

    //Pokemon API 
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

});

module.exports = router;