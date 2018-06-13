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

router.post('/insertarreceta', (req, res) => {
    modelRecetas.create({

        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        receta: req.body.receta
    }, (err, result) =>{
        res.json({success: 'receta subida'})
    })
})

module.exports = router