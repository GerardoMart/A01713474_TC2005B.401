-- 1
SELECT Nombre, SUM(Sueldo) as 'Total de Ingresos'
FROM Elenco
GROUP BY Nombre
ORDER BY SUM(Sueldo) DESC;

-- 2
SELECT nomestudio, SUM(Presupuesto) as 'Monto total'
FROM Pelicula
WHERE Anio >= '01/01/1980' AND Anio <= '31/12/1989'
GROUP BY nomestudio
ORDER BY SUM(Presupuesto) DESC;

-- 3
SELECT Nombre, AVG(Sueldo) as 'Sueldo Promedio'
FROM Actor A, Elenco E
WHERE A.nombre =  E.nombre
AND sexo = 'Hombre'
GROUP BY A.nombre
HAVING AVG(Sueldo) >= 5000000
ORDER BY AVG(Sueldo) DESC;

-- 4
SELECT Titulo, Anio, MIN(Presupuesto)
FROM Pelicula P
GROUP BY Titulo;

-- 5
SELECT Nombre, MAX(Sueldo)
FROM Elenco E, Actor A
WHERE E.nombre = A.nombre
AND Actor.sexo = 'Mujer';
