var express = require('express');
var router = express.Router();
let db = require('../db');
let modelRecetas = require('../models/recetas');
let recetasRouter = require('./api/recetas');
let restaurantesRouter = require('./api/restaurantes')
let modelRestaurantes = require('../models/restaurantes');
let modelUsuarios = require('../models/usuarios');
let usuariosRouter = require('./api/usuarios')

router.use('/recetas', recetasRouter)
router.use('/restaurantes', restaurantesRouter)
router.use('/usuarios', usuariosRouter)

module.exports = router
