let db = require('../db')

exports.index = (done) => {
    let consulta = 'SELECT * FROM recetas'
    db.get().query(consulta, (err, rows) => {
        if (err) return done(err, null)
        done(null, rows)
    })
}

exports.create = ({nombre, descripcion ,receta}, done) => {
    let consulta = 'INSERT INTO recetas (nombre, descripcion, receta, ingredientes) VALUES (?, ?, ?,?)'
    db.get().query(consulta, [nombre, descripcion, receta, ingredientes], (err, result) => {
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

