//Gestiona y maneja las conexiones a la base de datos
//Pool contiene la conexion a la base de datos
//El metodo connect solo se ejecuta una unica vez y realiza la conexion a la base de datos y se ejectua en el fichero wwww
//El metodo get recupera la conexion a la base de datos y lo llamamos cada vez que queramos ejecturar una query

let mysql = require('mysql')

let pool = null

// exports.connect = (done) => {
//     pool = mysql.createPool({
//         host: 'localhost',
//         user: 'root',
//         password: 'root',
//         port: '8889',
//         database: 'recetas'
//     })

//     done();
// }

exports.connect = (done) => {
    pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '8889',
        database: 'recetas'
    })

    done();
}



exports.get = () => {
    return pool;
}

//mysql://b06a4de8e0c3a1:c34eaf3d@eu-cdbr-west-02.cleardb.net/heroku_999732582d6c0a3

// b06a4de8e0c3a1: user
// c34eaf3d : pass
// eu-cdbr-west-02.cleardb.net :host
// heroku_999732582d6c0a3