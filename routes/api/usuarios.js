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
            res.json({success: 'registro completado'});
    })
})

router.post('/login', (req, res) => {
    modelUsuarios.login(req.body.email,
    (err, result) => {
        if(result.length === 0){
            res.json('falloMail')
        }else{
            if (result[0].password !== req.body.password) {
                res.json('falloPassword')
            }else{
                res.json(result)
              }
        }  
    })
})

router.post('/email', (req, res) => {
    modelUsuarios.checkEmail(req.body.email,
    (err, result) => {
        if(result.length === 0){
            res.json({mensaje:'noExixsteMail'})
        }else{
            res.json('existeMail')
        }
    })
})

router.post('/usuario', (req, res) => {
    modelUsuarios.getUsuario(req.body.id,
    (err, result) => {
        console.log(result.length) 
        if(result.length === 0){
            res.json('Este usuario no existe')
        }else{
            res.json(result)
        }
    })
})

module.exports = router