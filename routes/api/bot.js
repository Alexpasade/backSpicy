var express = require('express');
var router = express.Router();
var {Wit} = require('node-wit');
let fs = require('fs')
let Promise = require('bluebird')
let http = require('http')
var app = express()

const client = new Wit({accessToken:'Q6PBIFIPWDANYUIET6Y2MDXTRYCLUUQI'});

router.post('/', (req, res) => {
    client.message(req.body.mensaje, {})
    .then((data) => {
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