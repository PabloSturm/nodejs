const mysql=require('mysql2');

module.exports = ()=>{
  return mysql.createConnection({
    host: 'localhost', //lugar donde esta la base de datos
    user: 'root', //usuario por defecto
    password:'',//clave de mysql
    database: 'libreria'
  });
};