var express = require('express');
var router = express.Router();
var {Wit} = require('node-wit');
let fs = require('fs')
let Promise = require('bluebird')
let http = require('http')
var app = express()

const client = new Wit({accessToken:'DEW2LP3WW4X3HQQJCA5KJB4INERF5SSV'});

router.post('/', (req, res) => {
    client.message(req.body.mensaje, {})
    .then((data) => {
        console.log(data.entities.intent)
        if(data.entities.intent && data.entities.intent.length > 0){
            let ruta = `phrases/${data.entities.intent[0].value}`
           fs.readFile(ruta ,(err, datosFich) => {
            let frases = datosFich.toString().split('\n')
            res.json(frases[Math.round(Math.random()*frases.length)])
           })
        }else{
            res.json('No te entiendo.....')
        }
    })
})

module.exports = router