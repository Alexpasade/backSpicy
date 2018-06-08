let db = require('../db')

exports.index = (done) => {
    let consulta = 'SELECT * FROM recetas'
    db.get().query(consulta, (err, rows) => {
        if (err) return done(err, null)
        done(null, rows)
    })
}