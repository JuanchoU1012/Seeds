CREATE SCHEMA IF NOT EXISTS `semillas` DEFAULT CHARACTER SET utf8;
USE `semillas`;

CREATE TABLE IF NOT EXISTS `AccesoUsuarios` (
  `IdUsuario` INT NOT NULL AUTO_INCREMENT,
  `Email` VARCHAR(80) NOT NULL,
  `Password` VARBINARY(100) NOT NULL,
  `Rol` TINYINT(1) NOT NULL,
  PRIMARY KEY (`IdUsuario`),
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Vendedores` (
  `IdVendedor` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(60) NOT NULL,
  `Apellidos` VARCHAR(80) NOT NULL,
  `Telefono` BIGINT UNSIGNED NOT NULL,
  `AccesoUsuarios_IdUsuario` INT NOT NULL,
  PRIMARY KEY (`IdVendedor`),
  CONSTRAINT `fk_Vendedores_AccesoUsuarios`
    FOREIGN KEY (`AccesoUsuarios_IdUsuario`)
    REFERENCES `AccesoUsuarios` (`IdUsuario`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Compradores` (
  `IdComprador` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(60) NOT NULL,
  `Apellidos` VARCHAR(80) NOT NULL,
  `Telefono` BIGINT UNSIGNED NOT NULL,
  `AccesoUsuarios_IdUsuario` INT NOT NULL,
  PRIMARY KEY (`IdComprador`),
  CONSTRAINT `fk_Compradores_AccesoUsuarios`
    FOREIGN KEY (`AccesoUsuarios_IdUsuario`)
    REFERENCES `AccesoUsuarios` (`IdUsuario`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Departamentos` (
  `IdDepartamento` INT NOT NULL AUTO_INCREMENT,
  `NombreDep` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`IdDepartamento`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Municipios` (
  `IdMunicipio` INT NOT NULL AUTO_INCREMENT,
  `NombreMun` VARCHAR(60) NOT NULL,
  `Departamentos_IdDepartamento` INT NOT NULL,
  PRIMARY KEY (`IdMunicipio`),
  CONSTRAINT `fk_Municipios_Departamentos`
    FOREIGN KEY (`Departamentos_IdDepartamento`)
    REFERENCES `Departamentos` (`IdDepartamento`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Direcciones` (
  `IdDireccion` INT NOT NULL AUTO_INCREMENT,
  `Direccion` VARCHAR(100) NOT NULL,
  `Municipios_IdMunicipio` INT NOT NULL,
  `Departamentos_IdDepartamento` INT NOT NULL,
  PRIMARY KEY (`IdDireccion`),
  CONSTRAINT `fk_Direcciones_Municipios`
    FOREIGN KEY (`Municipios_IdMunicipio`)
    REFERENCES `Municipios` (`IdMunicipio`),
  CONSTRAINT `fk_Direcciones_Departamentos`
    FOREIGN KEY (`Departamentos_IdDepartamento`)
    REFERENCES `Departamentos` (`IdDepartamento`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Comercios` (
  `IdComercio` INT NOT NULL AUTO_INCREMENT,
  `Verificado` TINYINT(1) NOT NULL DEFAULT 0,
  `Vendedores_IdVendedor` INT NOT NULL,
  `Direcciones_IdDireccion` INT NOT NULL,
  `Telefono` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`IdComercio`),
  CONSTRAINT `fk_Comercios_Vendedores`
    FOREIGN KEY (`Vendedores_IdVendedor`)
    REFERENCES `Vendedores` (`IdVendedor`),
  CONSTRAINT `fk_Comercios_Direcciones`
    FOREIGN KEY (`Direcciones_IdDireccion`)
    REFERENCES `Direcciones` (`IdDireccion`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `semillas`.`Recetas` (
  `IdReceta` INT NOT NULL AUTO_INCREMENT,
  `Nombre` NVARCHAR(100) NOT NULL,
  `Descripcion` NVARCHAR(200) NOT NULL,
  PRIMARY KEY (`IdReceta`))

CREATE TABLE IF NOT EXISTS `Semillas` (
  `IdSemilla` INT NOT NULL AUTO_INCREMENT, 
  `NombreCientSemilla` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`IdSemilla`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Inventario` (
  `IdInventario` INT NOT NULL AUTO_INCREMENT,
  `Cantidad` INT NOT NULL,
  `PrecioGramo` DECIMAL(10,2) NOT NULL,
  `RutaImagen` VARCHAR(255) NOT NULL,
  `Comercios_IdComercio` INT NOT NULL,
  `Semillas_IdSemilla` INT NOT NULL,
  PRIMARY KEY (`IdInventario`),
  CONSTRAINT `fk_Inventario_Comercios`
    FOREIGN KEY (`Comercios_IdComercio`)
    REFERENCES `Comercios` (`IdComercio`),
  CONSTRAINT `fk_Inventario_Semillas`
    FOREIGN KEY (`Semillas_IdSemilla`)
    REFERENCES `Semillas` (`IdSemilla`)
) ENGINE=InnoDB;


CREATE OR REPLACE VIEW `VW_Recetas` AS
SELECT 
    r.IdReceta,
    r.Nombre,
    r.Descripcion,
    pr.NumeroPaso,
    pr.Instruccion,
    pr.TiempoMin,
    sm.IdSemilla,
    sm.NombreCientSemilla,
    rm.Ruta as RutaImagen,
    p.Producto as ProductoAlternativo
FROM Recetas r
INNER JOIN PasosRecetas pr ON r.IdReceta = pr.Recetas_IdReceta
INNER JOIN Recetas_Multimedia rm ON r.IdReceta = rm.Recetas_IdReceta 
INNER JOIN Recetas_has_Semillas rhs ON r.IdReceta = rhs.Recetas_IdReceta
INNER JOIN Semillas sm ON rhs.Semillas_IdSemilla = sm.IdSemilla
INNER JOIN Recetas_has_ProductosAlterRecetas rhp ON r.IdReceta = rhp.Recetas_IdReceta
INNER JOIN ProductosAlterRecetas p ON rhp.ProductosAlterRecetas_IdProductosAlter = p.IdProductosAlter;

CREATE OR REPLACE VIEW `VW_Inventario` AS
SELECT 
    i.IdInventario,
    i.Cantidad,
    i.PrecioGramo,
    i.RutaImagen,
    s.NombreCientSemilla,
    c.IdComercio,
    v.Nombre as NombreVendedor,
    v.Apellidos as ApellidosVendedor,
    d.Direccion,
    m.NombreMun as Municipio,
    dp.NombreDep as Departamento
FROM Inventario i
INNER JOIN Semillas s ON i.Semillas_IdSemilla = s.IdSemilla
INNER JOIN Comercios c ON i.Comercios_IdComercio = c.IdComercio
INNER JOIN Vendedores v ON c.Vendedores_IdVendedor = v.IdVendedor
INNER JOIN Direcciones d ON c.Direcciones_IdDireccion = d.IdDireccion
INNER JOIN Municipios m ON d.Municipios_IdMunicipio = m.IdMunicipio
INNER JOIN Departamentos dp ON d.Departamentos_IdDepartamento = dp.IdDepartamento;

ALTER TABLE Inventario
PARTITION BY LIST (Comercios_IdComercio) (
    PARTITION p1 VALUES IN (1),
    PARTITION p2 VALUES IN (2),
    PARTITION p3 VALUES IN (3),
    PARTITION p4 VALUES IN (4),
    PARTITION p5 VALUES IN (5),
    PARTITION others VALUES DEFAULT
);

DELIMITER //
CREATE TRIGGER `create_new_partition` BEFORE INSERT ON `Inventario`
FOR EACH ROW
BEGIN
    DECLARE v_partition_name VARCHAR(255);
    DECLARE v_partition_exists INT;
    
    SET v_partition_name = CONCAT('p', NEW.Comercios_IdComercio);
    
    SELECT COUNT(*) INTO v_partition_exists
    FROM INFORMATION_SCHEMA.PARTITIONS 
    WHERE TABLE_NAME = 'Inventario' AND PARTITION_NAME = v_partition_name;
    
    IF v_partition_exists = 0 AND NEW.Comercios_IdComercio > 5 THEN
        SET @sql = CONCAT('ALTER TABLE Inventario ADD PARTITION (PARTITION ', v_partition_name, ' VALUES IN (', NEW.Comercios_IdComercio, '))');
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END //
DELIMITER ;



