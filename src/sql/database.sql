CREATE DATABASE libreria;
USE libreria;

CREATE TABLE prestamos(
  id_prestamo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_libro INT,
  id_persona INT,
  fec_retiro DATE,
  fec_entrega DATE,
  observaciones VARCHAR(200)
);

CREATE TABLE libros(
  id_libro INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  isbn VARCHAR(50),
  titulo VARCHAR(50),
  resenia VARCHAR(100),
  autor VARCHAR(50),
  editorial VARCHAR(50),
  fec_edicion DATE,
  id_generos INT,
  formato VARCHAR(50)
);

CREATE TABLE genero_libros(
  id_generos INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_genero VARCHAR(50)
);

CREATE TABLE personas(
  id_persona INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50),
  apellido VARCHAR(50),
  fecha_nac DATE,
  id_genero INT,
  dni VARCHAR(50),
  direccion VARCHAR(50),
  localidad VARCHAR(50),
  id_provincia INT,
  telefono VARCHAR(50),
  email VARCHAR(50),
  fecha_alta DATE
);

CREATE TABLE genero_pers(
  id_genero INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  genero VARCHAR(50)
);

CREATE TABLE provincias(
  id_provincia INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  provincia VARCHAR(20)
);

DESCRIBE prestamos;
DESCRIBE libros;
DESCRIBE genero_libros;
DESCRIBE personas;
DESCRIBE genero_pers;
DESCRIBE provincias;

-- INSERT INTO personas (socio-empleado, nombre, apellido) VALUES (1, 'Pablo','Sturm');

-- SELECT * FROM personas;