CREATE DATABASE Lab17G;
USE Lab17G;

CREATE TABLE textos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contenido VARCHAR(255) NOT NULL
);

INSERT INTO textos (contenido)
VALUES 
('Texto número 1'),
('Seguno texto'),
('Texto cuya numeración corresponde al siguiente número del 2');

SELECT * FROM textos;