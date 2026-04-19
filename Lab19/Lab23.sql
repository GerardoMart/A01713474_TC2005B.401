-- Gerardo Martínez Carbajal | Stored procedures
USE Lab_20;

DROP PROCEDURE IF EXISTS ComparativoProveedores;
DROP PROCEDURE IF EXISTS ClasificacionMateriales;
DROP PROCEDURE IF EXISTS VerificarProveedorProyecto;

-- Reporte anual comparativo por proveedor
DELIMITER //

CREATE PROCEDURE ComparativoProveedores(IN anio1 INT, IN anio2 INT)
BEGIN
    SELECT 
        P.RFC,
        P.RazonSocial,
        SUM(CASE WHEN YEAR(E.Fecha) = anio1 THEN E.Cantidad ELSE 0 END) AS Total_Anio1,
        SUM(CASE WHEN YEAR(E.Fecha) = anio2 THEN E.Cantidad ELSE 0 END) AS Total_Anio2
    FROM Proveedores P, Entregan E
    WHERE P.RFC = E.RFC
    GROUP BY P.RFC, P.RazonSocial
    HAVING 
    SUM(CASE WHEN YEAR(E.Fecha) = anio2 THEN E.Cantidad ELSE 0 END)
    >
    SUM(CASE WHEN YEAR(E.Fecha) = anio1 THEN E.Cantidad ELSE 0 END);
END //

DELIMITER ;

-- Análisis de desempeño por material
DELIMITER //

CREATE PROCEDURE ClasificacionMateriales(IN promedioMin INT)
BEGIN
    SELECT 
        M.Clave,
        M.Descripcion,
        AVG(E.Cantidad) AS Promedio,
        SUM(E.Cantidad) AS Total,
        CASE 
            WHEN AVG(E.Cantidad) >= 500 THEN 'Alto rendimiento'
            WHEN AVG(E.Cantidad) >= 200 THEN 'Medio rendimiento'
            ELSE 'Bajo rendimiento'
        END AS Clasificacion
    FROM Materiales M, Entregan E
    WHERE M.Clave = E.Clave
    GROUP BY M.Clave, M.Descripcion
    HAVING AVG(E.Cantidad) >= promedioMin;
END //

DELIMITER ;

-- Verificación de participación en proyectos
DELIMITER //

CREATE PROCEDURE VerificarProveedorProyecto(
    IN proveedorRFC VARCHAR(20),
    IN proyecto1 VARCHAR(100),
    IN proyecto2 VARCHAR(100)
)
BEGIN
    DECLARE contador INT;

    SELECT COUNT(DISTINCT Pr.Denominacion)
    INTO contador
    FROM Entregan E, Proyectos Pr
    WHERE E.Numero = Pr.Numero
    AND E.RFC = proveedorRFC
    AND Pr.Denominacion IN (proyecto1, proyecto2);

    IF contador = 2 THEN
        SELECT 'El proveedor participó en ambos proyectos' AS Resultado;
    ELSE
        SELECT 'El proveedor NO participó en ambos proyectos' AS Resultado;
    END IF;
END //

DELIMITER ;

CALL ComparativoProveedores(2000, 2001);
CALL ClasificacionMateriales(300);
CALL VerificarProveedorProyecto('VAGO780901', 'Vamos México', 'Querétaro Limpio');