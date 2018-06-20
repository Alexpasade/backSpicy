var express = require('express');
var router = express.Router();
let modelRestaurantes = require('../../models/restaurantes')

router.get('/', (req, res) =>{
    modelRestaurantes.index((err, rows) => {
        if (err) return console.log(err.message)
        res.json(rows)
    })
})

router.post('/getrestaurante', (req, res) => {
    modelRestaurantes.getRestaurant(req.body.id,
    (err, result) =>{
        if(result.lenght === 0){
            res.json('no hay restaurnate')
        }else{
            res.json(result[0])
        }
    })
})

router.post('/opinion', (req, res) => {
    modelRestaurantes.create({

        opinion: req.body.opinion,
        user_id: req.body.user_id,
        rest_id: req.body.rest_id

    }, (err, result) => {
        res.json({success: 'opinion subida'})
    })
})

router.post('/opinionrest', (req, res) => {
    modelRestaurantes.getOpiniones(req.body.rest_id,
    (err, result) => {
        if(result.lenght === 0){
            res.json('no hay opiniones')
        }else{
            res.json(result)
        }
    })
})

router.get('/tiendas', (req, res) =>{
    modelRestaurantes.indextienda((err, rows) => {
        if (err) return console.log(err.message)
        res.json(rows)
    })
})

router.post('/gettienda', (req, res) => {
    modelRestaurantes.getTienda(req.body.id,
    (err, result) =>{
        if(result.lenght === 0){
            res.json('no hay tienda')
        }else{
            res.json(result[0])
        }
    })
})

router.post('/favoritos', (req, res) => {
    console.log(req.body)
    modelRestaurantes.favoriteRestaurants({

        user_id: req.body.user_id,
        rest_id: req.body.rest_id

    },(err, result) => {
        console.log(err)
        res.json(1)
    })
})

router.post('/restaurantesfavoritos', (req,res) => {
    modelRestaurantes.getFavoriteRestaurants(req.body.user_id,
    (err, result) =>{
        if(result.lenght === 0){
            res.json('no hay restaurantes favoritos')
        }else{
            res.json(result)
        }
    })
})

router.post('/restaurantesfavoritosbyid', (req,res) => {
    console.log(req.body.user_id[0].id)
    modelRestaurantes.getFavoriteRestaurantsById(req.body.user_id,
    (err, result) =>{
        if(result.lenght === 0){
            res.json('no tienes restaurantes favoritos')
        }else{
            res.json(result)
        }
    })
})


module.exports = router
