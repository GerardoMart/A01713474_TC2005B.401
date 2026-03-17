CREATE DATABASE Lab19;
USE Lab19;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    descripcion_rol VARCHAR(100)
);

CREATE TABLE privilegios (
    id_privilegio INT AUTO_INCREMENT PRIMARY KEY,
    accion VARCHAR(100)
);

CREATE TABLE user_roles (
    user_id INT,
    rol_id INT,

    PRIMARY KEY(user_id, rol_id),

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (rol_id) REFERENCES roles(id_rol)
);

CREATE TABLE role_privileges (
    rol_id INT,
    privilegio_id INT,

    PRIMARY KEY(rol_id, privilegio_id),

    FOREIGN KEY (rol_id) REFERENCES roles(id_rol),
    FOREIGN KEY (privilegio_id) REFERENCES privilegios(id_privilegio)
);

CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url TEXT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT,
    image_id INT,
    user_id INT,
    username VARCHAR(100),

    FOREIGN KEY (image_id) REFERENCES images(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE settings (
    id INT PRIMARY KEY,
    background_color VARCHAR(50)
);

INSERT INTO settings VALUES (1, 'white');

INSERT INTO roles (descripcion_rol)
VALUES
('admin'),
('usuario');

INSERT INTO privilegios (accion)
VALUES
('subir_imagen'),
('comentar'),
('eliminar_imagen'),
('cambiar_color_fondo');

INSERT INTO role_privileges VALUES
(2,2);

INSERT INTO role_privileges VALUES
(1,1),
(1,2),
(1,3),
(1,4);

UPDATE user_roles
SET rol_id = 1
WHERE user_id = 2;

SELECT u.email, r.descripcion_rol
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.rol_id = r.id_rol;