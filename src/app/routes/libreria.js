const dbConnection = require("../../config/dbConnection");

module.exports = (app) => {
  const conexion = dbConnection();

  app.get("/", (req, res) => {
    res.render("libreria.ejs");
  });

  app.get("/prestamos", (req, res) => {
    conexion.query(
      "SELECT * FROM prestamos, libros, personas WHERE prestamos.id_libro=libros.id_libro and prestamos.id_persona=personas.id_persona",
      (err, result) => {
        conexion.query(
          "SELECT * FROM personas, provincias, genero_pers WHERE personas.id_provincia = provincias.id_provincia and personas.id_genero = genero_pers.id_genero",
          (err, result1) => {
            conexion.query(
              "SELECT * FROM libros, genero_libros WHERE libros.id_generos = genero_libros.id_generos",
              (err, result2) => {
                res.render("prestamos.ejs", {
                  prestamos: result,
                  personas: result1,
                  libros: result2,
                });
              }
            );
          }
        );
      }
    );
  });

  app.post("/prestamo", (req, res) => {
    const id_libro = parseInt(req.body.id_libro);
    const id_persona = parseInt(req.body.id_persona);
    const fec_retiro = req.body.fecha_prestamo;
    const observaciones = req.body.observaciones;

    conexion.query(
      "INSERT INTO prestamos SET?",
      {
        id_libro,
        id_persona,
        fec_retiro,
        observaciones
      },
      (err, result) => {
        res.redirect("/prestamos");
      }
    );
  });

  app.get("/modificar_prestamo/:id", (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM prestamos, libros, personas WHERE prestamos.id_libro=libros.id_libro and prestamos.id_persona=personas.id_persona and id_prestamo=?";

    conexion.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al editar el registro:", err);
        res.status(500).send("Error al editar el registro ");
      } else {
        res.render("modificar_prestamo", {
          prestamos: result[0],
        });
      }
    });
  });

  app.post("/modificar_prestamo/:id", (req, res) => {
    const id = req.params.id;
    const id_libro = parseInt(req.body.id_libro);
    const id_persona = parseInt(req.body.id_persona);
    const fec_retiro = req.body.fec_retiro;
    const observaciones = req.body.observaciones;

    const query =
      "UPDATE prestamos SET id_libro=?, id_persona=?, fec_retiro=?, observaciones=? WHERE id_prestamo=?";

    conexion.query(
      query,
      [
        id_libro,
        id_persona,
        fec_retiro,
        observaciones,
        id
      ],
      (err, result) => {
        if (err) {
          console.error("Error al editar el registro:", err);
          res.status(500).send("Error al editar el registro ");
        } else {
          res.redirect("/prestamos");
        }
      }
    );
  });

  app.get("/devolver_libro/:id", (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM prestamos, libros, personas WHERE prestamos.id_libro=libros.id_libro and prestamos.id_persona=personas.id_persona and id_prestamo=?";

    conexion.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al editar el registro:", err);
        res.status(500).send("Error al editar el registro ");
      } else {
        res.render("devolver_libro", {
          prestamos: result[0],
        });
      }
    });
  });

  app.post("/devolver_libro/:id", (req, res) => {
    const id = req.params.id;
    const fec_entrega=req.body.fec_entrega;
    const observaciones = req.body.observaciones+' - ENTREGADO';

    const query =
      "UPDATE prestamos SET fec_entrega=?, observaciones=? WHERE id_prestamo=?";

    conexion.query(
      query,
      [
        fec_entrega,
        observaciones,
        id
      ],
      (err, result) => {
        if (err) {
          console.error("Error al editar el registro:", err);
          res.status(500).send("Error al editar el registro ");
        } else {
          res.redirect("/prestamos");
        }
      }
    );
  });


  /* ================== PERSONAS ===================0*/
  app.get("/personas", (req, res) => {
    conexion.query(
      "SELECT * FROM personas, provincias, genero_pers WHERE personas.id_provincia = provincias.id_provincia and personas.id_genero = genero_pers.id_genero",
      (err, result) => {

        conexion.query(
          "SELECT * FROM provincias",
          (err, result1) => {
            conexion.query(
              "SELECT * FROM genero_pers",
              (err, result2) => {
                res.render("personas.ejs", {
                  personas: result,
                  provincias: result1,
                  generos: result2,
                });
              }
            );
          }
        );
      }
    );
  });

  app.post("/persona", (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const fecha_nac = req.body.fecha_nac;
    const id_genero = req.body.id_genero;
    const dni = req.body.dni;
    const direccion = req.body.direccion;
    const localidad = req.body.localidad;
    const id_provincia = parseInt(req.body.id_provincia);
    const telefono = req.body.telefono;
    const email = req.body.email;
    const fecha_alta = req.body.fecha_alta;

    conexion.query(
      "INSERT INTO personas SET?",
      {
        nombre,
        apellido,
        fecha_nac,
        id_genero,
        dni,
        direccion,
        localidad,
        id_provincia,
        telefono,
        email,
        fecha_alta,
      },
      (err, result) => {
        res.redirect("/personas");
      }
    );
  });

  app.get("/borrar_persona/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM personas WHERE id_persona=?";

    conexion.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al borrar el registro:", err);
        res.status(500).send("Error al borrar ");
      } else {
        res.redirect("/personas");
      }
    });
  });

  app.get("/editar_persona/:id", (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM personas WHERE id_persona=?";

    conexion.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al editar el registro:", err);
        res.status(500).send("Error al editar el registro ");
      } else {
        res.render("editar_persona", {
          personas: result[0],
        });
      }
    });
  });

  app.post("/editar_persona/:id", (req, res) => {
    const id = req.params.id;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const fecha_nac = req.body.fecha_nac;
    const id_genero = parseInt(req.body.id_genero);
    const dni = req.body.dni;
    const direccion = req.body.direccion;
    const localidad = req.body.localidad;
    const id_provincia = parseInt(req.body.id_provincia);
    const telefono = req.body.telefono;
    const email = req.body.email;
    const fecha_alta = req.body.fecha_alta;

    const query =
      "UPDATE personas SET nombre=?, apellido=?, fecha_nac=?, id_genero=?, dni=?, direccion=?, localidad=?, id_provincia=?, telefono=?, email=?, fecha_alta=? WHERE id_persona=?";

    conexion.query(
      query,
      [
        nombre,
        apellido,
        fecha_nac,
        id_genero,
        dni,
        direccion,
        localidad,
        id_provincia,
        telefono,
        email,
        fecha_alta,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("Error al editar el registro:", err);
          res.status(500).send("Error al editar el registro ");
        } else {
          res.redirect("/personas");
        }
      }
    );
  });

  /* ================== LIBROS ===================0*/
  app.get("/libros", (req, res) => {
    conexion.query(
      "SELECT * FROM libros, genero_libros WHERE libros.id_generos = genero_libros.id_generos",
      (err, result) => {
        conexion.query(
          "SELECT * FROM genero_libros",
          (err, result1) => {
            res.render("libros.ejs", {
              libros: result,
              genero_libros: result1
            });
          });
      }
    );
  });

  app.post("/libro", (req, res) => {
    const titulo = req.body.titulo;
    const autor = req.body.autor;
    const editorial = req.body.editorial;
    const fec_edicion = req.body.fec_edicion;
    const id_generos = parseInt(req.body.id_generos);
    const formato = req.body.formato;
    const isbn = req.body.isbn;
    const resenia = req.body.resenia;

    conexion.query(
      "INSERT INTO libros SET?",
      {
        isbn,
        titulo,
        resenia,
        autor,
        editorial,
        fec_edicion,
        id_generos,
        formato,
      },
      (err, result) => {
        res.redirect("/libros");
      }
    );
  });

  app.get("/borrar_libro/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM libros WHERE id_libro=?";

    conexion.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al borrar el registro:", err);
        res.status(500).send("Error al borrar ");
      } else {
        res.redirect("/libros");
      }
    });
  });

  app.get("/editar_libro/:id", (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM libros WHERE id_libro=?";

    conexion.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al editar el registro:", err);
        res.status(500).send("Error al editar el registro ");
      } else {
        res.render("editar_libros", {
          libros: result[0],
        });
      }
    });
  });

  app.post("/editar_libro/:id", (req, res) => {
    const id = req.params.id;
    const titulo = req.body.titulo;
    const autor = req.body.autor;
    const editorial = req.body.editorial;
    const fec_edicion = req.body.fec_edicion;
    const id_generos = parseInt(req.body.id_generos);
    const formato = req.body.formato;
    const isbn = req.body.isbn;
    const resenia = req.body.resenia;

    const query =
      "UPDATE libros SET isbn=?, titulo=?, resenia=?, autor=?, editorial=?, fec_edicion=?, id_generos=?, formato=? WHERE id_libro=?";

    conexion.query(
      query,
      [
        isbn,
        titulo,
        resenia,
        autor,
        editorial,
        fec_edicion,
        id_generos,
        formato,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("Error al editar el registro:", err);
          res.status(500).send("Error al editar el registro ");
        } else {
            res.redirect("/libros");
        }
      }
    );
  });

  /* ================= DATOS ANEXOS ==================*/

  /* ------------------ PROVINCIAS -------------------*/
  app.get("/datos_anexos", (req, res) => {
    res.render("datos_anexos.ejs");
  });

  app.get("/carga_prov", (req, res) => {
    conexion.query("SELECT * FROM provincias", (err, result) => {
      res.render("carga_prov.ejs", {
        provincias: result,
      });
    });
  });
  app.post("/provincias", (req, res) => {
    const provincia = req.body.provincia;
    conexion.query(
      "INSERT INTO provincias SET?",
      {
        provincia,
      },
      (err, result) => {
        res.redirect("/carga_prov");
      }
    );
  });

  app.get("/borrar_provincia/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM provincias WHERE id_provincia=?";

    conexion.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al borrar el registro:", err);
        res.status(500).send("Error al borrar ");
      } else {
        res.redirect("/carga_prov");
      }
    });
  });

  app.get("/editar_provincia/:id", (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM provincias WHERE id_provincia=?";

    conexion.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al editar el registro:", err);
        res.status(500).send("Error al editar el registro ");
      } else {
        res.render("editar_provincia", {
          provincia: result[0],
        });
      }
    });
  });

  app.post("/editar_provincia/:id", (req, res) => {
    const id = req.params.id;
    const { provincia } = req.body;
    const query = "UPDATE provincias SET provincia=? WHERE id_provincia=?";

    conexion.query(query, [provincia, id], (err, result) => {
      if (err) {
        console.error("Error al editar el registro:", err);
        res.status(500).send("Error al editar el registro ");
      } else {
        res.redirect("/carga_prov");
      }
    });
  });

  /*-------------------------- GENEROS ---------------------------*/
  app.get("/genero", (req, res) => {
    conexion.query("SELECT * FROM genero_pers", (err, result) => {
      res.render("genero.ejs", {
        generos: result,
      });
    });
  });

  app.post("/generos", (req, res) => {
    const genero = req.body.genero;
    conexion.query(
      "INSERT INTO genero_pers SET?",
      {
        genero,
      },
      (err, result) => {
        res.redirect("/genero");
      }
    );
  });

  app.get("/borrar_genero/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM genero_pers WHERE id_genero=?";

    conexion.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al borrar el registro:", err);
        res.status(500).send("Error al borrar ");
      } else {
        res.redirect("/genero");
      }
    });
  });

  app.get("/editar_genero/:id", (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM genero_pers WHERE id_genero=?";

    conexion.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al editar el registro:", err);
        res.status(500).send("Error al editar el registro ");
      } else {
        res.render("editar_genero", {
          genero: result[0],
        });
      }
    });
  });

  app.post("/editar_genero/:id", (req, res) => {
    const id = req.params.id;
    const { genero } = req.body;
    const query = "UPDATE genero_pers SET genero=? WHERE id_genero=?";

    conexion.query(query, [genero, id], (err, result) => {
      if (err) {
        console.error("Error al editar el registro:", err);
        res.status(500).send("Error al editar el registro ");
      } else {
        res.redirect("/genero");
      }
    });
  });

  /*-------------------------- GENEROS LIBROS ---------------------------*/
  app.get("/genero_lib", (req, res) => {
    conexion.query("SELECT * FROM genero_libros", (err, result) => {
      res.render("genero_lib.ejs", {
        generosLib: result,
      });
    });
  });

  app.post("/generos_lib", (req, res) => {
    const nombre_genero = req.body.nombre_genero;
    conexion.query(
      "INSERT INTO genero_libros SET?",
      {
        nombre_genero,
      },
      (err, result) => {
        res.redirect("/genero_lib");
      }
    );
  });

  app.get("/borrar_genero_lib/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM genero_libros WHERE id_generos=?";

    conexion.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al borrar el registro:", err);
        res.status(500).send("Error al borrar ");
      } else {
        res.redirect("/genero_lib");
      }
    });
  });

  app.get("/editar_genero_lib/:id", (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM genero_libros WHERE id_generos=?";

    conexion.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al editar el registro:", err);
        res.status(500).send("Error al editar el registro ");
      } else {
        res.render("editar_genero_lib", {
          generoLib: result[0],
        });
      }
    });
  });

  app.post("/editar_genero_lib/:id", (req, res) => {
    const id = req.params.id;
    const { nombre_genero } = req.body;
    const query = "UPDATE genero_libros SET nombre_genero=? WHERE id_generos=?";

    conexion.query(query, [nombre_genero, id], (err, result) => {
      if (err) {
        console.error("Error al editar el registro:", err);
        res.status(500).send("Error al editar el registro ");
      } else {
        res.redirect("/genero_lib");
      }
    });
  });
};
