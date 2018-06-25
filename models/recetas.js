let db = require('../db')

exports.index = (done) => {
    let consulta = 'SELECT * FROM recetas'
    db.get().query(consulta, (err, rows) => {
        if (err) return done(err, null)
        done(null, rows)
    })
}

exports.create = ({nombre, descripcion ,receta,ingredientes,imagen}, done) => {
    let consulta = 'INSERT INTO recetas (nombre, descripcion, receta, ingredientes,imagen) VALUES (?, ?, ?, ?, ?)'
    db.get().query(consulta, [nombre, descripcion, receta, ingredientes, imagen], (err, result) => {
        if (err) return done(err, null)
        done(null, result)
    })
}

exports.getReceta = (id, done) =>{
    let consulta = 'SELECT * FROM recetas WHERE id=?'
    db.get().query(consulta, [id], (err, result) => {
        if (err) return done(err, null)
        done(null, result)
    })
}

