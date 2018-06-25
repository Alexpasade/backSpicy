var express = require('express');
var router = express.Router();
let modelRecetas = require('../../models/recetas')
let fs = require('fs')
let multipart = require('connect-multiparty')
let multipartMiddleware = multipart()

//Ruta: /api/recetas/index
router.get('/', (req,res) => {
    modelRecetas.index((err,rows) => {
        if(err) return console.log(err.message);
        res.json(rows)    
    })
})

router.post('/insertarreceta', multipartMiddleware, (req, res) => {
    let random = Math.random().toString(36).substring(2, 7)
    let content = fs.readFileSync(req.files.imagen.path)
    fs.writeFileSync(`public/images/${random}.jpg`, content)

    modelRecetas.create({
        
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        receta: req.body.receta,
        ingredientes: req.body.ingredientes,
        imagen: `http://localhost:3000/images/${random}.jpg`

    }, (err, result) =>{
        res.json({success: 'receta subida'})
    })
})

router.post('/getreceta', (req, res) => {
    modelRecetas.getReceta(req.body.id,
    (err, result) => {
        if(result.length === 0){
            res.json('no hay receta')
        }else{
            res.json(result[0])
        }
    })
})

module.exports = router