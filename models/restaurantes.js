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

exports.create = ({opinion, user_id, rest_id, user_foto}, done) =>{
    let consulta = 'INSERT INTO opiniones (opinion, user_id, rest_id, user_foto) VALUES (?,?,?,?)'
    db.get().query(consulta, [opinion, user_id, rest_id, user_foto], (err, result) => {
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

exports.indextienda = (done) => {
    let consulta = 'SELECT * FROM tiendas'
    db.get().query(consulta, (err, rows) => {
        if (err) return done(err, null)
        done(null, rows)
    })
}

exports.getTienda = (id, done) =>{
    let consulta = 'SELECT * FROM tiendas WHERE id=?'
    db.get().query(consulta, [id], (err, result) =>{
        if (err) return done(err, null)
        done(null, result)
    })
}

exports.favoriteRestaurants = ({user_id, rest_id}, done) => {
    let consulta = 'INSERT INTO restaurantes_favoritos(user_id, rest_id) VALUES (?,?)'
    db.get().query(consulta, [user_id,rest_id], (err, result) =>{
        if (err) return done(err, null)
        done(null, result)
    })

}


exports.getFavoriteRestaurants = (user_id, done) => {
    let consulta = 'SELECT * FROM restaurantes_favoritos rf, restaurantes r WHERE rf.rest_id = r.id AND rf.user_id=?'
    db.get().query(consulta, [user_id], (err, result) => {
        if (err) return done(err, null)
        done(null, result)
    })
}

exports.getFavoriteRestaurantsById = (user_id, done) => {
    let consulta = 'SELECT * FROM restaurantes_favoritos WHERE user_id=?'
    db.get().query(consulta, [user_id],(err, result) =>{
        if (err) return done(err,null)
        done(null, result)
    })
}

exports.destroyFavoriteRestaurantById = ({user_id, rest_id}, done) =>{
    let elimina = 'DELETE FROM restaurantes_favoritos WHERE user_id=? AND rest_id=?'
    db.get().query(elimina, [user_id, rest_id],(err, result) => {
        if (err) return done(err, null)
        done(null,result)
    })

}