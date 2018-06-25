var express = require('express');
var router = express.Router()
let modelUsuarios = require('../../models/usuarios')
var sha256 = require('js-sha256')
let fs = require('fs')
let multipart = require('connect-multiparty')
let multipartMiddleware = multipart()

router.post('/crearusuario', (req, res) => {
    let random = Math.random().toString(36).substring(2, 7)
    let content = fs.readFileSync(req.files.imagen.path)
    fs.writeFileSync(`public/images/${random}.jpg`, content)

    modelUsuarios.create({
        nombre: req.body.nombre,
        ciudad: req.body.ciudad,
        edad: req.body.edad,
        email: req.body.email,
        password: sha256(req.body.password),
        imagen: `http://localhost:3000/images/${random}.jpg`

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
            if (result[0].password !== sha256(req.body.password)) {
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
        if(result.length === 0){
            res.json('Este usuario no existe')
        }else{
            res.json(result)
        }
    })
})

module.exports = router