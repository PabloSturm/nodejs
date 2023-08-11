const dbConnection=require('../../config/dbConnection');

module.exports=app=>{
  const conexion=dbConnection();

/* ================ PROVINCIAS =============*/
  app.get ('/carga',(req,res)=>{
    conexion.query('SELECT * FROM provincias',(err,result)=>{
      res.render('carga.ejs',{
        provincias: result
      })
    })
  });

  app.post('/provincias',(req,res)=>{
    const provincia=req.body.provincia;
    conexion.query('INSERT INTO provincias SET?',{
      provincia},(err,result)=>{
        res.redirect('/carga');
      }
    )
  });

  app.get('/borrar_provincia/:id',(req,res)=>{/*get va en la dirección URL*/
    const id=req.params.id;
    const query='DELETE FROM provincias WHERE id_provincia=?';

    conexion.query(query,[id],(err,result)=>{
      if(err){
        console.error('Error al borrar el registro:',err);
        res.status(500).send('Error al borrar ');
      }else{
        console.log('Registro borrado');
        res.redirect('/carga');
      };
    });
  });

  app.get('/editar_provincia/:id',(req,res)=>{
    const id=req.params.id;
    const query='SELECT * FROM provincias WHERE id_provincia=?';

    conexion.query(query,[id],(err,result)=>{
      if(err){
        console.error('Error al editar el registro:',err);
        res.status(500).send('Error al editar el registro ');
      }else{
        console.log('Registro editado correctamente');
        res.render('editar_provincia',{
          provincia:result[0]
        });
      };
    });
  });

  app.post('/editar_provincia/:id',(req,res)=>{
    const id=req.params.id;
    const {provincia}=req.body;
    const query='UPDATE provincias SET provincia=? WHERE id_provincia=?';

    conexion.query(query,[provincia,id],(err,result)=>{
      if(err){
        console.error('Error al editar el registro:',err);
        res.status(500).send('Error al editar el registro ');
      }else{
        console.log('Registro editado correctamente');
        res.redirect('/carga');
      };
    });
  });

  /* ================ GENEROS =============*/
  app.get ('/genero',(req,res)=>{
    conexion.query('SELECT * FROM generos',(err,result)=>{
      res.render('genero.ejs',{
        generos: result
      })
    })
  });

  app.post('/generos',(req,res)=>{
    const genero=req.body.genero;
    conexion.query('INSERT INTO generos SET?',{
      genero},(err,result)=>{
        res.redirect('/genero');
      }
    )
  });

  app.get('/borrar_genero/:id',(req,res)=>{/*get va en la dirección URL*/
    const id=req.params.id;
    const query='DELETE FROM generos WHERE id_genero=?';

    conexion.query(query,[id],(err,result)=>{
      if(err){
        console.error('Error al borrar el registro:',err);
        res.status(500).send('Error al borrar ');
      }else{
        console.log('Registro borrado');
        res.redirect('/genero');
      };
    });
  });

  app.get('/editar_genero/:id',(req,res)=>{
    const id=req.params.id;
    const query='SELECT * FROM generos WHERE id_genero=?';

    conexion.query(query,[id],(err,result)=>{
      if(err){
        console.error('Error al editar el registro:',err);
        res.status(500).send('Error al editar el registro ');
      }else{
        console.log('Registro editado correctamente');
        res.render('editar_genero',{
          genero:result[0]
        });
      };
    });
  });

  app.post('/editar_genero/:id',(req,res)=>{
    const id=req.params.id;
    const {genero}=req.body;
    const query='UPDATE generos SET genero=? WHERE id_genero=?';

    conexion.query(query,[genero,id],(err,result)=>{
      if(err){
        console.error('Error al editar el registro:',err);
        res.status(500).send('Error al editar el registro ');
      }else{
        console.log('Registro editado correctamente');
        res.redirect('/genero');
      };
    });
  });

    /* ================ CATEGORIAS =============*/
    app.get ('/categoria',(req,res)=>{
      conexion.query('SELECT * FROM categorias',(err,result)=>{
        res.render('categoria.ejs',{
          categorias: result
        })
      })
    });
  
    app.post('/categorias',(req,res)=>{
      const categoria=req.body.categoria;
      conexion.query('INSERT INTO categorias SET?',{
        categoria},(err,result)=>{
          res.redirect('/categoria');
        }
      )
    });
  
    app.get('/borrar_categoria/:id',(req,res)=>{/*get va en la dirección URL*/
      const id=req.params.id;
      const query='DELETE FROM categorias WHERE id_categoria=?';
  
      conexion.query(query,[id],(err,result)=>{
        if(err){
          console.error('Error al borrar el registro:',err);
          res.status(500).send('Error al borrar ');
        }else{
          console.log('Registro borrado');
          res.redirect('/categoria');
        };
      });
    });
  
    app.get('/editar_categoria/:id',(req,res)=>{
      const id=req.params.id;
      const query='SELECT * FROM categorias WHERE id_categoria=?';
  
      conexion.query(query,[id],(err,result)=>{
        if(err){
          console.error('Error al editar el registro:',err);
          res.status(500).send('Error al editar el registro ');
        }else{
          console.log('Registro editado correctamente');
          res.render('editar_categoria',{
            categoria:result[0]
          });
        };
      });
    });
  
    app.post('/editar_categoria/:id',(req,res)=>{
      const id=req.params.id;
      const {categoria}=req.body;
      const query='UPDATE categorias SET categoria=? WHERE id_categoria=?';
  
      conexion.query(query,[categoria,id],(err,result)=>{
        if(err){
          console.error('Error al editar el registro:',err);
          res.status(500).send('Error al editar el registro ');
        }else{
          console.log('Registro editado correctamente');
          res.redirect('/categoria');
        };
      });
    });
  /* ================== PERSONAS ================*/
  app.get('/',(req,res)=>{
    conexion.query('SELECT * FROM personas, provincias WHERE personas.id_provincia = provincias.id_provincia',(err,result)=>{
      res.render('personas.ejs',{
        personas:result
      });
    });
  });

  app.post('/personas',(req,res)=>{
    const nombre=req.body.nombre;
    const apellido=req.body.apellido;
    const id_provincia=req.body.id_provincia;

    conexion.query('INSERT INTO personas SET?',{
      nombre,
      apellido,
      id_provincia},(err,result)=>{
        res.redirect('/');
      }
    )
  });

  app.post('/borrar',(req,res)=>{
    const id=req.body.registroId;
    const query='DELETE FROM personas WHERE id_persona=?';

    conexion.query(query,[id],(err,result)=>{
      if(err){
        console.error('Error al borrar el registro:',err);
        res.status(500).send('Error al borrar ');
      }else{
        console.log('Registro borrado');
        res.redirect('/');
      };
    });
  });

  app.post('/editar',(req,res)=>{
    const id=req.body.registroId;
    const {nombre, apellido, id_provincia}=req.body;
    const query='UPDATE personas SET nombre=?, apellido=?, id_provincia =? WHERE id_persona=?';

    conexion.query(query,[nombre,apellido,id_provincia,id],(err,result)=>{
      if(err){
        console.error('Error al borrar el registro:',err);
        res.status(500).send('Error al borrar ');
      }else{
        console.log('Registro borrado');
        res.redirect('/');
      };
    });
  });
};
