const app=require('./config/server');
require('./app/routes/libreria')(app);//se requiere solo la funcion app

//iniciar el servidor
app.listen(app.get('port'),()=>{
  console.log('Activo en puerto ',app.get('port'));//pide puerto para saber en cual esta
});