let db = require('../db')

exports.index = (done) => {
    let consulta = 'SELECT * FROM usuarios'
    db.get().query(consulta, (err, rows) => {
        if (err) return done(err, null)
        done(null, rows)
    })
}

exports.create = ({nombre, ciudad, edad, email, password}, done) =>{
    let consulta = 'INSERT INTO usuarios (nombre, ciudad, edad, email, password) VALUES (?, ?, ?, ?, ?)'
    db.get().query(consulta, [nombre, ciudad, edad, email, password], (err, result)=>{
        if (err) return done(err, null)
        done(null, result)
    })
}
exports.login = (email,done) => {
    let consulta = 'SELECT * FROM usuarios WHERE email=?' 
    db.get().query(consulta, [email], (err, result) => {
        if (err) return done(err, null)
        done(null, result)
    })
}

exports.checkEmail = (email,done) => {
    let consulta = 'SELECT * FROM usuarios WHERE email=?' 
    db.get().query(consulta, [email], (err, result) => {
        if (err) return done(err, null)
        done(null, result)
    })
}

exports.getUsuario = (id, done) => {
    let consulta = 'SELECT * FROM usuarios WHERE id=?'
    db.get().query(consulta, [id], (err, result) => {
        if(err) return done(err, null)
        done(null, result)
    })
}

exports.changePassword = ({password, email}, done) => {
    let update = 'UPDATE usuarios SET password=? WHERE email=?'
    db.get().query(update,[password, email], (err, result) => {
        if(err) return done(err, null)
        done(null, result)
    })
}

exports.changeFoto = ({imagen, id}, done) => {
    let update = 'UPDATE usuarios SET imagen=? WHERE id=?'
    db.get().query(update,[imagen, id], (err, result) => {
        if(err) return done(err, mnull)
        done(null, result)
    })
}
