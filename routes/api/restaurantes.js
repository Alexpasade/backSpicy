var express = require('express');
var router = express.Router();
let modelRestaurantes = require('../../models/restaurantes')

router.get('/', (req, res) =>{
    modelRestaurantes.index((err, rows) => {
        if (err) return console.log(err.message)
        res.json(rows)
    })
})

module.exports = router
