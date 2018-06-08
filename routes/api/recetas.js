var express = require('express');
var router = express.Router();
let modelRecetas = require('../../models/recetas')

//Ruta: /api/recetas/index
router.get('/', (req,res) => {
    modelRecetas.index((err,rows) => {
        if(err) return console.log(err.message);
        res.json(rows)    
    })
})

module.exports = router