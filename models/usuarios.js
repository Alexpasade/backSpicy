let db = require('../db')
let fs = require('fs')

exports.index = (done) => {
    let consulta = 'SELECT * FROM usuarios'
    db.get().query(consulta, (err, rows) => {
        if (err) return done(err, null)
        done(null, rows)
    })
}

exports.create = ({nombre, ciudad, edad, email, password, imagen}, done) =>{
    let consulta = 'INSERT INTO usuarios (nombre, ciudad, edad, email, password, imagen) VALUES (?, ?, ?, ?, ?, ?)'
    db.get().query(consulta, [nombre, ciudad, edad, email, password, imagen], (err, result)=>{
        if (err) return done(err, null)
        done(null, result)
    })
}
exports.index = ({password},done) => {
    let consulta = 'SELECT * FROM usuarios (password)'
}