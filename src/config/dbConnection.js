const mysql=require('mysql');

module.exports = ()=>{
  return mysql.createConnection({
    host: 'containers-us-west-131.railway.app', //lugar donde esta la base de datos
    user: 'root', //usuario por defecto
    password:'WbVP6jBniuumrQuxYHnp',//clave de mysql
    database: 'railway'
  });
};