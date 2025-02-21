-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema saberesysabores
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema saberesysabores
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `saberesysabores` DEFAULT CHARACTER SET utf8mb3 ;
USE `saberesysabores` ;

-- -----------------------------------------------------
-- Table `saberesysabores`.`accesousuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saberesysabores`.`accesousuarios` (
  `IdAccesoUsuario` INT NOT NULL AUTO_INCREMENT,
  `Email` VARCHAR(80) CHARACTER SET 'utf8mb3' NOT NULL,
  `Password` VARBINARY(100) NOT NULL,
  `Rol` TINYINT(1) NOT NULL,
  `Activo` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`IdAccesoUsuario`, `Email`),
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 23
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `saberesysabores`.`departamentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saberesysabores`.`departamentos` (
  `IdDepartamento` INT NOT NULL AUTO_INCREMENT,
  `NombreDep` VARCHAR(60) CHARACTER SET 'utf8mb3' NOT NULL,
  PRIMARY KEY (`IdDepartamento`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `saberesysabores`.`municipios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saberesysabores`.`municipios` (
  `IdMunicipio` INT NOT NULL,
  `NombreMun` VARCHAR(60) CHARACTER SET 'utf8mb3' NOT NULL,
  `Departamentos_IdDepartamento` INT NOT NULL,
  PRIMARY KEY (`IdMunicipio`),
  INDEX `fk_Municipios_Departamentos1_idx` (`Departamentos_IdDepartamento` ASC) VISIBLE,
  CONSTRAINT `fk_Municipios_Departamentos1`
    FOREIGN KEY (`Departamentos_IdDepartamento`)
    REFERENCES `saberesysabores`.`departamentos` (`IdDepartamento`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `saberesysabores`.`direcciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saberesysabores`.`direcciones` (
  `IdDireccion` INT NOT NULL AUTO_INCREMENT,
  `Direccion` VARCHAR(60) CHARACTER SET 'utf8mb3' NOT NULL,
  `Municipios_IdMunicipio` INT NOT NULL,
  `Departamentos_IdDepartamento` INT NOT NULL,
  PRIMARY KEY (`IdDireccion`),
  INDEX `fk_Direcciones_Municipios1_idx` (`Municipios_IdMunicipio` ASC) VISIBLE,
  INDEX `fk_Direcciones_Departamentos1_idx` (`Departamentos_IdDepartamento` ASC) VISIBLE,
  CONSTRAINT `fk_Direcciones_Departamentos1`
    FOREIGN KEY (`Departamentos_IdDepartamento`)
    REFERENCES `saberesysabores`.`departamentos` (`IdDepartamento`),
  CONSTRAINT `fk_Direcciones_Municipios1`
    FOREIGN KEY (`Municipios_IdMunicipio`)
    REFERENCES `saberesysabores`.`municipios` (`IdMunicipio`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `saberesysabores`.`vendedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saberesysabores`.`vendedores` (
  `IdVendedor` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(60) CHARACTER SET 'utf8mb3' NOT NULL,
  `Apellidos` VARCHAR(80) CHARACTER SET 'utf8mb3' NOT NULL,
  `Telefono` BIGINT UNSIGNED NOT NULL,
  `AccesoUsuarios_IdAccesoUsuario` INT NOT NULL,
  `AccesoUsuarios_Email` VARCHAR(80) CHARACTER SET 'utf8mb3' NOT NULL,
  PRIMARY KEY (`IdVendedor`),
  UNIQUE INDEX `AccesoUsuarios_Email_UNIQUE` (`AccesoUsuarios_Email` ASC) VISIBLE,
  UNIQUE INDEX `Telefono_UNIQUE` (`Telefono` ASC) VISIBLE,
  INDEX `fk_Vendedores_AccesoUsuarios1_idx` (`AccesoUsuarios_IdAccesoUsuario` ASC, `AccesoUsuarios_Email` ASC) VISIBLE,
  CONSTRAINT `fk_Vendedores_AccesoUsuarios1`
    FOREIGN KEY (`AccesoUsuarios_IdAccesoUsuario` , `AccesoUsuarios_Email`)
    REFERENCES `saberesysabores`.`accesousuarios` (`IdAccesoUsuario` , `Email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `saberesysabores`.`comercios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saberesysabores`.`comercios` (
  `IdComercio` INT NOT NULL AUTO_INCREMENT,
  `Verificado` TINYINT NOT NULL DEFAULT '0',
  `Vendedores_IdVendedor` INT NOT NULL,
  `Direcciones_IdDireccion` INT NOT NULL,
  `Telefono` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`IdComercio`),
  INDEX `fk_Comercios_Vendedores1_idx` (`Vendedores_IdVendedor` ASC) VISIBLE,
  INDEX `fk_Comercios_Direcciones1_idx` (`Direcciones_IdDireccion` ASC) VISIBLE,
  CONSTRAINT `fk_Comercios_Direcciones1`
    FOREIGN KEY (`Direcciones_IdDireccion`)
    REFERENCES `saberesysabores`.`direcciones` (`IdDireccion`),
  CONSTRAINT `fk_Comercios_Vendedores1`
    FOREIGN KEY (`Vendedores_IdVendedor`)
    REFERENCES `saberesysabores`.`vendedores` (`IdVendedor`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `saberesysabores`.`comercios_multimedia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saberesysabores`.`comercios_multimedia` (
  `IdMultimedia` INT NOT NULL AUTO_INCREMENT,
  `Ruta` VARCHAR(255) NOT NULL,
  `Comercios_IdComercio` INT NOT NULL,
  PRIMARY KEY (`IdMultimedia`),
  INDEX `fk_Comercios_Multimedia_Comercios1_idx` (`Comercios_IdComercio` ASC) VISIBLE,
  CONSTRAINT `fk_Comercios_Multimedia_Comercios1`
    FOREIGN KEY (`Comercios_IdComercio`)
    REFERENCES `saberesysabores`.`comercios` (`IdComercio`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `saberesysabores`.`semillas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saberesysabores`.`semillas` (
  `IdSemilla` INT NOT NULL AUTO_INCREMENT,
  `NombreCientSemilla` VARCHAR(200) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `NombreComun` VARCHAR(200) NULL DEFAULT NULL,
  `Descripcion` VARCHAR(300) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  PRIMARY KEY (`IdSemilla`))
ENGINE = InnoDB
AUTO_INCREMENT = 32
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `saberesysabores`.`inventario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saberesysabores`.`inventario` (
  `IdInventario` INT NOT NULL AUTO_INCREMENT,
  `RutaImagen` VARCHAR(255) NOT NULL,
  `Comercios_IdComercio` INT NOT NULL,
  `Semillas_IdSemilla` INT NOT NULL,
  `PrecioGr` MEDIUMINT NOT NULL,
  PRIMARY KEY (`IdInventario`),
  INDEX `fk_Inventario_Comercios1_idx` (`Comercios_IdComercio` ASC) VISIBLE,
  INDEX `fk_Inventario_Semillas1_idx` (`Semillas_IdSemilla` ASC) VISIBLE,
  CONSTRAINT `fk_Inventario_Comercios1`
    FOREIGN KEY (`Comercios_IdComercio`)
    REFERENCES `saberesysabores`.`comercios` (`IdComercio`),
  CONSTRAINT `fk_Inventario_Semillas1`
    FOREIGN KEY (`Semillas_IdSemilla`)
    REFERENCES `saberesysabores`.`semillas` (`IdSemilla`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `saberesysabores`.`recetas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saberesysabores`.`recetas` (
  `IdReceta` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(100) CHARACTER SET 'utf8mb3' NOT NULL,
  `Descripcion` VARCHAR(200) CHARACTER SET 'utf8mb3' NOT NULL,
  PRIMARY KEY (`IdReceta`))
ENGINE = InnoDB
AUTO_INCREMENT = 37
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `saberesysabores`.`pasosrecetas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saberesysabores`.`pasosrecetas` (
  `IdPaso` INT NOT NULL AUTO_INCREMENT,
  `NumeroPaso` TINYINT NOT NULL,
  `Instruccion` VARCHAR(200) CHARACTER SET 'utf8mb3' NOT NULL,
  `TiempoMin` TINYINT NULL DEFAULT NULL,
  `Recetas_IdReceta` INT NOT NULL,
  PRIMARY KEY (`IdPaso`),
  INDEX `fk_PasosRecetas_Recetas1_idx` (`Recetas_IdReceta` ASC) VISIBLE,
  CONSTRAINT `fk_PasosRecetas_Recetas1`
    FOREIGN KEY (`Recetas_IdReceta`)
    REFERENCES `saberesysabores`.`recetas` (`IdReceta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `saberesysabores`.`productosalterrecetas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saberesysabores`.`productosalterrecetas` (
  `IdProductosAlter` INT NOT NULL AUTO_INCREMENT,
  `Producto` VARCHAR(60) CHARACTER SET 'utf8mb3' NOT NULL,
  PRIMARY KEY (`IdProductosAlter`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `saberesysabores`.`recetas_has_productosalterrecetas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saberesysabores`.`recetas_has_productosalterrecetas` (
  `Recetas_IdReceta` INT NOT NULL,
  `ProductosAlterRecetas_IdProductosAlter` INT NOT NULL,
  PRIMARY KEY (`Recetas_IdReceta`, `ProductosAlterRecetas_IdProductosAlter`),
  INDEX `fk_Recetas_has_ProductosAlterRecetas_ProductosAlterRecetas1_idx` (`ProductosAlterRecetas_IdProductosAlter` ASC) VISIBLE,
  INDEX `fk_Recetas_has_ProductosAlterRecetas_Recetas1_idx` (`Recetas_IdReceta` ASC) VISIBLE,
  CONSTRAINT `fk_Recetas_has_ProductosAlterRecetas_ProductosAlterRecetas1`
    FOREIGN KEY (`ProductosAlterRecetas_IdProductosAlter`)
    REFERENCES `saberesysabores`.`productosalterrecetas` (`IdProductosAlter`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Recetas_has_ProductosAlterRecetas_Recetas1`
    FOREIGN KEY (`Recetas_IdReceta`)
    REFERENCES `saberesysabores`.`recetas` (`IdReceta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `saberesysabores`.`recetas_has_semillas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saberesysabores`.`recetas_has_semillas` (
  `Recetas_IdReceta` INT NOT NULL,
  `Semillas_IdSemilla` INT NOT NULL,
  INDEX `fk_Recetas_has_Semillas_Semillas1_idx` (`Semillas_IdSemilla` ASC) INVISIBLE,
  INDEX `fk_Recetas_has_Semillas_Recetas1_idx` (`Recetas_IdReceta` ASC) INVISIBLE,
  CONSTRAINT `fk_Recetas_has_Semillas_Recetas1`
    FOREIGN KEY (`Recetas_IdReceta`)
    REFERENCES `saberesysabores`.`recetas` (`IdReceta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Recetas_has_Semillas_Semillas1`
    FOREIGN KEY (`Semillas_IdSemilla`)
    REFERENCES `saberesysabores`.`semillas` (`IdSemilla`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `saberesysabores`.`recetas_multimedia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saberesysabores`.`recetas_multimedia` (
  `IdMultimedia` INT NOT NULL AUTO_INCREMENT,
  `Ruta` VARCHAR(255) NOT NULL,
  `Recetas_IdReceta` INT NOT NULL,
  PRIMARY KEY (`IdMultimedia`),
  INDEX `fk_Recetas_Multimedia_Recetas1_idx` (`Recetas_IdReceta` ASC) INVISIBLE,
  CONSTRAINT `fk_Recetas_Multimedia_Recetas1`
    FOREIGN KEY (`Recetas_IdReceta`)
    REFERENCES `saberesysabores`.`recetas` (`IdReceta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 21
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `saberesysabores`.`semillas_multimedia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saberesysabores`.`semillas_multimedia` (
  `IdSemillasMultimedia` INT NOT NULL AUTO_INCREMENT,
  `Ruta` VARCHAR(300) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `Semillas_IdSemilla` INT NOT NULL,
  PRIMARY KEY (`IdSemillasMultimedia`),
  INDEX `fk_Semillas_Multimedia_Semillas1_idx` (`Semillas_IdSemilla` ASC) INVISIBLE,
  CONSTRAINT `fk_Semillas_Multimedia_Semillas1`
    FOREIGN KEY (`Semillas_IdSemilla`)
    REFERENCES `saberesysabores`.`semillas` (`IdSemilla`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `saberesysabores`.`usuarioscomunes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saberesysabores`.`usuarioscomunes` (
  `IdUsuario` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(60) CHARACTER SET 'utf8mb3' NOT NULL,
  `Apellidos` VARCHAR(80) CHARACTER SET 'utf8mb3' NOT NULL,
  `AccesoUsuarios_IdAccesoUsuario` INT NOT NULL,
  `AccesoUsuarios_Email` VARCHAR(80) CHARACTER SET 'utf8mb3' NOT NULL,
  PRIMARY KEY (`IdUsuario`),
  UNIQUE INDEX `AccesoUsuarios_Email_UNIQUE` (`AccesoUsuarios_Email` ASC) VISIBLE,
  INDEX `fk_Compradores_AccesoUsuarios1_idx` (`AccesoUsuarios_IdAccesoUsuario` ASC, `AccesoUsuarios_Email` ASC) VISIBLE,
  CONSTRAINT `fk_Compradores_AccesoUsuarios1`
    FOREIGN KEY (`AccesoUsuarios_IdAccesoUsuario` , `AccesoUsuarios_Email`)
    REFERENCES `saberesysabores`.`accesousuarios` (`IdAccesoUsuario` , `Email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

USE `saberesysabores` ;

-- -----------------------------------------------------
-- Placeholder table for view `saberesysabores`.`vw_inventario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saberesysabores`.`vw_inventario` (`IdInventario` INT, `PrecioGr` INT, `RutaImagen` INT, `NombreCientSemilla` INT, `IdComercio` INT, `NombreVendedor` INT, `ApellidosVendedor` INT, `Direccion` INT, `Municipio` INT, `Departamento` INT);

-- -----------------------------------------------------
-- Placeholder table for view `saberesysabores`.`vw_recetas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saberesysabores`.`vw_recetas` (`IdReceta` INT, `Nombre` INT, `Descripcion` INT, `Pasos` INT, `IdSemillas` INT, `Semillasusadas` INT, `IdIngredientes` INT, `ProductosAdicionales` INT, `Ruta` INT);

-- -----------------------------------------------------
-- View `saberesysabores`.`vw_inventario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `saberesysabores`.`vw_inventario`;
USE `saberesysabores`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `saberesysabores`.`vw_inventario` AS select `i`.`IdInventario` AS `IdInventario`,`i`.`PrecioGr` AS `PrecioGr`,`i`.`RutaImagen` AS `RutaImagen`,`s`.`NombreCientSemilla` AS `NombreCientSemilla`,`c`.`IdComercio` AS `IdComercio`,`v`.`Nombre` AS `NombreVendedor`,`v`.`Apellidos` AS `ApellidosVendedor`,`d`.`Direccion` AS `Direccion`,`m`.`NombreMun` AS `Municipio`,`dp`.`NombreDep` AS `Departamento` from ((((((`saberesysabores`.`inventario` `i` join `saberesysabores`.`semillas` `s` on((`i`.`Semillas_IdSemilla` = `s`.`IdSemilla`))) join `saberesysabores`.`comercios` `c` on((`i`.`Comercios_IdComercio` = `c`.`IdComercio`))) join `saberesysabores`.`vendedores` `v` on((`c`.`Vendedores_IdVendedor` = `v`.`IdVendedor`))) join `saberesysabores`.`direcciones` `d` on((`c`.`Direcciones_IdDireccion` = `d`.`IdDireccion`))) join `saberesysabores`.`municipios` `m` on((`d`.`Municipios_IdMunicipio` = `m`.`IdMunicipio`))) join `saberesysabores`.`departamentos` `dp` on((`d`.`Departamentos_IdDepartamento` = `dp`.`IdDepartamento`)));

-- -----------------------------------------------------
-- View `saberesysabores`.`vw_recetas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `saberesysabores`.`vw_recetas`;
USE `saberesysabores`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `saberesysabores`.`vw_recetas` AS select `r`.`IdReceta` AS `IdReceta`,`r`.`Nombre` AS `Nombre`,`r`.`Descripcion` AS `Descripcion`,coalesce(group_concat(distinct concat(`pr`.`NumeroPaso`,': ',`pr`.`Instruccion`) order by `pr`.`NumeroPaso` ASC separator ' | '),'No se encontraron pasos') AS `Pasos`,coalesce(group_concat(distinct `s`.`IdSemilla` separator ', ')) AS `IdSemillas`,coalesce(group_concat(distinct `s`.`NombreComun` separator ', '),'No se encontraron semillas') AS `Semillasusadas`,coalesce(group_concat(distinct `p`.`IdProductosAlter` separator ', ')) AS `IdIngredientes`,coalesce(group_concat(distinct `p`.`Producto` separator ', '),'No se encontraron productos adicionales') AS `ProductosAdicionales`,`rm`.`Ruta` AS `Ruta` from ((((((`saberesysabores`.`recetas` `r` left join `saberesysabores`.`recetas_has_semillas` `rs` on((`r`.`IdReceta` = `rs`.`Recetas_IdReceta`))) left join `saberesysabores`.`semillas` `s` on((`rs`.`Semillas_IdSemilla` = `s`.`IdSemilla`))) left join `saberesysabores`.`recetas_has_productosalterrecetas` `rp` on((`r`.`IdReceta` = `rp`.`Recetas_IdReceta`))) left join `saberesysabores`.`productosalterrecetas` `p` on((`rp`.`ProductosAlterRecetas_IdProductosAlter` = `p`.`IdProductosAlter`))) left join `saberesysabores`.`recetas_multimedia` `rm` on((`r`.`IdReceta` = `rm`.`Recetas_IdReceta`))) left join `saberesysabores`.`pasosrecetas` `pr` on((`r`.`IdReceta` = `pr`.`Recetas_IdReceta`))) group by `rm`.`Ruta`,`r`.`IdReceta`,`r`.`Nombre`,`r`.`Descripcion`;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
