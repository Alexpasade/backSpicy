let db = require('../db')

exports.index = (done) => {
    let consulta = 'SELECT * FROM restaurantes'
    db.get().query(consulta, (err, rows) => {
        if (err) return done(err, null)
        done(null, rows)
    })
}

exports.getRestaurant = (id, done) =>{
    let consulta = 'SELECT * FROM restaurantes WHERE id=?'
    db.get().query(consulta, [id], (err, result) =>{
        if (err) return done(err, null)
        done(null, result)
    })
}

exports.create = ({opinion, user_id, rest_id}, done) =>{
    let consulta = 'INSERT INTO opiniones (opinion, user_id, rest_id) VALUES (?,?,?)'
    db.get().query(consulta, [opinion, user_id, rest_id], (err, result) => {
        if (err) return done (err, null)
        done(null, result)
    })
}

exports.getOpiniones = (rest_id, done) =>{
    let consulta = 'SELECT * FROM opiniones o, usuarios u WHERE o.rest_id=? AND o.user_id = u.id'
    db.get().query(consulta, [rest_id], (err, result) => {
        if (err) return done(err, null)
        done(null, result)
    })
}