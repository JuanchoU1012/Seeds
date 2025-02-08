-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema semillas
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema semillas
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `semillas` DEFAULT CHARACTER SET utf8 ;
USE `semillas` ;

-- -----------------------------------------------------
-- Table `semillas`.`AccesoUsuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `semillas`.`AccesoUsuarios` (
  `IdAccesoUsuario` INT NOT NULL AUTO_INCREMENT,
  `Email` NVARCHAR(80) NOT NULL,
  `Password` VARBINARY(100) NOT NULL,
  `Rol` TINYINT(1) NOT NULL,
  PRIMARY KEY (`IdAccesoUsuario`, `Email`),
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `semillas`.`Vendedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `semillas`.`Vendedores` (
  `IdVendedor` INT NOT NULL AUTO_INCREMENT,
  `Nombre` NVARCHAR(60) NOT NULL,
  `Apellidos` NVARCHAR(80) NOT NULL,
  `Telefono` BIGINT UNSIGNED NOT NULL,
  `AccesoUsuarios_IdAccesoUsuario` INT NOT NULL,
  `AccesoUsuarios_Email` NVARCHAR(80) NOT NULL,
  PRIMARY KEY (`IdVendedor`),
  INDEX `fk_Vendedores_AccesoUsuarios1_idx` (`AccesoUsuarios_IdAccesoUsuario` ASC, `AccesoUsuarios_Email` ASC) VISIBLE,
  CONSTRAINT `fk_Vendedores_AccesoUsuarios1`
    FOREIGN KEY (`AccesoUsuarios_IdAccesoUsuario` , `AccesoUsuarios_Email`)
    REFERENCES `semillas`.`AccesoUsuarios` (`IdAccesoUsuario` , `Email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `semillas`.`UsuariosComunes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `semillas`.`UsuariosComunes` (
  `IdUsuario` INT NOT NULL AUTO_INCREMENT,
  `Nombre` NVARCHAR(60) NOT NULL,
  `Apellidos` NVARCHAR(80) NOT NULL,
  `Telefono` BIGINT UNSIGNED NOT NULL,
  `AccesoUsuarios_IdAccesoUsuario` INT NOT NULL,
  `AccesoUsuarios_Email` NVARCHAR(80) NOT NULL,
  PRIMARY KEY (`IdUsuario`),
  INDEX `fk_Compradores_AccesoUsuarios1_idx` (`AccesoUsuarios_IdAccesoUsuario` ASC, `AccesoUsuarios_Email` ASC) VISIBLE,
  CONSTRAINT `fk_Compradores_AccesoUsuarios1`
    FOREIGN KEY (`AccesoUsuarios_IdAccesoUsuario` , `AccesoUsuarios_Email`)
    REFERENCES `semillas`.`AccesoUsuarios` (`IdAccesoUsuario` , `Email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `semillas`.`Departamentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `semillas`.`Departamentos` (
  `IdDepartamento` INT NOT NULL AUTO_INCREMENT,
  `NombreDep` NVARCHAR(60) NOT NULL,
  PRIMARY KEY (`IdDepartamento`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `semillas`.`Municipios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `semillas`.`Municipios` (
  `IdMunicipio` INT NOT NULL,
  `NombreMun` NVARCHAR(60) NOT NULL,
  `Departamentos_IdDepartamento` INT NOT NULL,
  PRIMARY KEY (`IdMunicipio`),
  INDEX `fk_Municipios_Departamentos1_idx` (`Departamentos_IdDepartamento` ASC) VISIBLE,
  CONSTRAINT `fk_Municipios_Departamentos1`
    FOREIGN KEY (`Departamentos_IdDepartamento`)
    REFERENCES `semillas`.`Departamentos` (`IdDepartamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `semillas`.`Direcciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `semillas`.`Direcciones` (
  `IdDireccion` INT NOT NULL AUTO_INCREMENT,
  `Direccion` NVARCHAR(60) NOT NULL,
  `Municipios_IdMunicipio` INT NOT NULL,
  `Departamentos_IdDepartamento` INT NOT NULL,
  PRIMARY KEY (`IdDireccion`),
  INDEX `fk_Direcciones_Municipios1_idx` (`Municipios_IdMunicipio` ASC) VISIBLE,
  INDEX `fk_Direcciones_Departamentos1_idx` (`Departamentos_IdDepartamento` ASC) VISIBLE,
  CONSTRAINT `fk_Direcciones_Municipios1`
    FOREIGN KEY (`Municipios_IdMunicipio`)
    REFERENCES `semillas`.`Municipios` (`IdMunicipio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Direcciones_Departamentos1`
    FOREIGN KEY (`Departamentos_IdDepartamento`)
    REFERENCES `semillas`.`Departamentos` (`IdDepartamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `semillas`.`Comercios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `semillas`.`Comercios` (
  `IdComercio` INT NOT NULL AUTO_INCREMENT,
  `Verificado` TINYINT NOT NULL DEFAULT 0,
  `Vendedores_IdVendedor` INT NOT NULL,
  `Direcciones_IdDireccion` INT NOT NULL,
  `Telefono` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`IdComercio`),
  INDEX `fk_Comercios_Vendedores1_idx` (`Vendedores_IdVendedor` ASC) VISIBLE,
  INDEX `fk_Comercios_Direcciones1_idx` (`Direcciones_IdDireccion` ASC) VISIBLE,
  CONSTRAINT `fk_Comercios_Vendedores1`
    FOREIGN KEY (`Vendedores_IdVendedor`)
    REFERENCES `semillas`.`Vendedores` (`IdVendedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comercios_Direcciones1`
    FOREIGN KEY (`Direcciones_IdDireccion`)
    REFERENCES `semillas`.`Direcciones` (`IdDireccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `semillas`.`Semillas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `semillas`.`Semillas` (
  `IdSemilla` INT NOT NULL AUTO_INCREMENT,
  `NombreCientSemilla` NVARCHAR(200) NOT NULL,
  PRIMARY KEY (`IdSemilla`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `semillas`.`Inventario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `semillas`.`Inventario` (
  `IdInventario` INT NOT NULL AUTO_INCREMENT,
  `RutaImagen` VARCHAR(255) NOT NULL,
  `Comercios_IdComercio` INT NOT NULL,
  `Semillas_IdSemilla` INT NOT NULL,
  PRIMARY KEY (`IdInventario`),
  INDEX `fk_Inventario_Comercios1_idx` (`Comercios_IdComercio` ASC) VISIBLE,
  INDEX `fk_Inventario_Semillas1_idx` (`Semillas_IdSemilla` ASC) VISIBLE,
  CONSTRAINT `fk_Inventario_Comercios1`
    FOREIGN KEY (`Comercios_IdComercio`)
    REFERENCES `semillas`.`Comercios` (`IdComercio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Inventario_Semillas1`
    FOREIGN KEY (`Semillas_IdSemilla`)
    REFERENCES `semillas`.`Semillas` (`IdSemilla`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `semillas`.`Recetas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `semillas`.`Recetas` (
  `IdReceta` INT NOT NULL AUTO_INCREMENT,
  `Nombre` NVARCHAR(100) NOT NULL,
  `Descripcion` NVARCHAR(200) NOT NULL,
  PRIMARY KEY (`IdReceta`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `semillas`.`ProductosAlterRecetas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `semillas`.`ProductosAlterRecetas` (
  `IdProductosAlter` INT NOT NULL AUTO_INCREMENT,
  `Producto` NVARCHAR(60) NOT NULL,
  PRIMARY KEY (`IdProductosAlter`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `semillas`.`PasosRecetas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `semillas`.`PasosRecetas` (
  `IdPaso` INT NOT NULL AUTO_INCREMENT,
  `NumeroPaso` TINYINT NOT NULL,
  `Instruccion` NVARCHAR(200) NOT NULL,
  `TiempoMin` TINYINT NULL,
  `Recetas_IdReceta` INT NOT NULL,
  PRIMARY KEY (`IdPaso`),
  INDEX `fk_PasosRecetas_Recetas1_idx` (`Recetas_IdReceta` ASC) VISIBLE,
  CONSTRAINT `fk_PasosRecetas_Recetas1`
    FOREIGN KEY (`Recetas_IdReceta`)
    REFERENCES `semillas`.`Recetas` (`IdReceta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `semillas`.`Recetas_has_Semillas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `semillas`.`Recetas_has_Semillas` (
  `Recetas_IdReceta` INT NOT NULL,
  `Semillas_IdSemilla` INT NOT NULL,
  PRIMARY KEY (`Recetas_IdReceta`, `Semillas_IdSemilla`),
  INDEX `fk_Recetas_has_Semillas_Semillas1_idx` (`Semillas_IdSemilla` ASC) VISIBLE,
  INDEX `fk_Recetas_has_Semillas_Recetas1_idx` (`Recetas_IdReceta` ASC) VISIBLE,
  CONSTRAINT `fk_Recetas_has_Semillas_Recetas1`
    FOREIGN KEY (`Recetas_IdReceta`)
    REFERENCES `semillas`.`Recetas` (`IdReceta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Recetas_has_Semillas_Semillas1`
    FOREIGN KEY (`Semillas_IdSemilla`)
    REFERENCES `semillas`.`Semillas` (`IdSemilla`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `semillas`.`Recetas_has_ProductosAlterRecetas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `semillas`.`Recetas_has_ProductosAlterRecetas` (
  `Recetas_IdReceta` INT NOT NULL,
  `ProductosAlterRecetas_IdProductosAlter` INT NOT NULL,
  PRIMARY KEY (`Recetas_IdReceta`, `ProductosAlterRecetas_IdProductosAlter`),
  INDEX `fk_Recetas_has_ProductosAlterRecetas_ProductosAlterRecetas1_idx` (`ProductosAlterRecetas_IdProductosAlter` ASC) VISIBLE,
  INDEX `fk_Recetas_has_ProductosAlterRecetas_Recetas1_idx` (`Recetas_IdReceta` ASC) VISIBLE,
  CONSTRAINT `fk_Recetas_has_ProductosAlterRecetas_Recetas1`
    FOREIGN KEY (`Recetas_IdReceta`)
    REFERENCES `semillas`.`Recetas` (`IdReceta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Recetas_has_ProductosAlterRecetas_ProductosAlterRecetas1`
    FOREIGN KEY (`ProductosAlterRecetas_IdProductosAlter`)
    REFERENCES `semillas`.`ProductosAlterRecetas` (`IdProductosAlter`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `semillas`.`Recetas_Multimedia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `semillas`.`Recetas_Multimedia` (
  `IdMultimedia` INT NOT NULL AUTO_INCREMENT,
  `Ruta` VARCHAR(255) NOT NULL,
  `Recetas_IdReceta` INT NOT NULL,
  PRIMARY KEY (`IdMultimedia`),
  INDEX `fk_Recetas_Multimedia_Recetas1_idx` (`Recetas_IdReceta` ASC) VISIBLE,
  CONSTRAINT `fk_Recetas_Multimedia_Recetas1`
    FOREIGN KEY (`Recetas_IdReceta`)
    REFERENCES `semillas`.`Recetas` (`IdReceta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `semillas`.`Comercios_Multimedia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `semillas`.`Comercios_Multimedia` (
  `IdMultimedia` INT NOT NULL AUTO_INCREMENT,
  `Ruta` VARCHAR(255) NOT NULL,
  `Comercios_IdComercio` INT NOT NULL,
  PRIMARY KEY (`IdMultimedia`),
  INDEX `fk_Comercios_Multimedia_Comercios1_idx` (`Comercios_IdComercio` ASC) VISIBLE,
  CONSTRAINT `fk_Comercios_Multimedia_Comercios1`
    FOREIGN KEY (`Comercios_IdComercio`)
    REFERENCES `semillas`.`Comercios` (`IdComercio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `semillas` ;

-- -----------------------------------------------------
-- Placeholder table for view `semillas`.`VW_Recetas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `semillas`.`VW_Recetas` (`IdReceta` INT, `Nombre` INT, `Descripcion` INT, `IdSemilla` INT, `NombreCientSemilla` INT, `ruta` INT, `producto` INT);

-- -----------------------------------------------------
-- View `semillas`.`VW_Recetas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `semillas`.`VW_Recetas`;
USE `semillas`;
CREATE OR REPLACE VIEW `VW_Recetas` AS
SELECT r.*, pr.*, sm.*, rm.ruta, p.producto 
FROM Recetas r
INNER JOIN Pasosrecetas pr ON r.IdReceta = pr.Recetas_IdReceta
INNER JOIN Recetas_Multimedia rm ON r.IdReceta = rm.Recetas_IdReceta 
INNER JOIN Recetas_has_Semillas rhs ON r.IdReceta = rhs.Recetas_IdReceta
INNER JOIN Semillas sm ON rhs.Semillas_IdSemilla = sm.IdSemilla
INNER JOIN Recetas_has_ProductosAlterRecetas rhp ON r.IdReceta = rhp.Recetas_IdReceta
INNER JOIN ProductosAlterRecetas p ON rhp.ProductosAlterRecetas_IdProductosAlter = p.IdProductosAlter;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
