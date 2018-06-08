var express = require('express');
var router = express.Router()
let modelUsuarios = require('../../models/usuarios')

router.post('/crearusuario', (req, res) => {
    modelUsuarios.create({
        nombre: req.body.nombre,
        ciudad: req.body.ciudad,
        edad: req.body.edad,
        email: req.body.email,
        password: req.body.password,
        imagen: req.body.imagen

    }, (err, result) => {
        
    })
})

module.exports = router