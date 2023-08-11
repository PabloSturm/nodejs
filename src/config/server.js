//requerimientos
const express=require('express');//se requiere los modulos instalados express
const path=require('path');
const bodyParser=require ('body-parser');// se requiere el modulo instalado body-parser
const app=express();

//settings
app.set('port',process.env.PORT || 3000);//variable de entorno para puerto sino puerto 3000
app.set('view engine','ejs');//motor de plantillas
app.set('views', path.join(__dirname, '../app/views'));//path.join concatena la variable de entorno (__dirname) y el lugar donde estan los views


//middleware
app.use(express.text());
app.use(bodyParser.urlencoded({extended:false}));
module.exports=app;//se exporta el paquete app generado anteriormente
