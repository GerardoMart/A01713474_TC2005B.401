CREATE DATABASE LabS5;
USE LabS5;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(50) DEFAULT 'usuario'
);

CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url TEXT,
    user_id INT
);

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT,
    image_id INT,
    user_id INT NULL
);

CREATE TABLE settings (
    id INT PRIMARY KEY,
    background_color VARCHAR(50)
);

INSERT INTO settings VALUES (1, 'white');

ALTER TABLE comments ADD username VARCHAR(100);

