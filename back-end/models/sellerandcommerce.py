from config.connection import connection
import mysql.connector

class sellerandcommerce:
    def create_seller_and_commerce(data, image_url):
        conn, cursor = connection()
        try:
            
            sql_seller = 'INSERT INTO vendedores (Nombre, Apellidos, Telefono, AccesoUsuarios_IdAccesoUsuario, AccesoUsuarios_Email) VALUES (%s, %s, %s, %s, %s)'
            values = (data['Nombre'], data['Apellido'], data['Telefono'], data['IdAccesoUsuario'], data['Correo'])
            cursor.execute(sql_seller, values)
            seller_id = cursor.lastrowid
            print(seller_id, 'vendedor')

            # Get Departamento Id
            sql_departamento = 'SELECT IdDepartamento FROM departamentos WHERE NombreDep = %s'
            cursor.execute(sql_departamento, (data['Departamento'],))
            departamento_id = cursor.fetchone()['IdDepartamento']
            print(departamento_id, 'departamento')

            # Get Ciudad Id
            sql_ciudad = 'SELECT IdMunicipio FROM municipios WHERE NombreMun = %s'
            cursor.execute(sql_ciudad, (data['Ciudad'],))
            ciudad_id = cursor.fetchone()['IdMunicipio']
            print(ciudad_id, 'ciudad')

            # Get Direccion Id
            sql_address = 'INSERT INTO direcciones (Direccion, Departamentos_IdDepartamento, municipios_IdMunicipio) VALUES (%s, %s, %s)'
            values = (data['Direccion'], departamento_id, ciudad_id)
            cursor.execute(sql_address, values)
            direccion_id = cursor.lastrowid
            print(direccion_id, 'direccion')

            # Insert Commerce 
            sql_commerce = 'INSERT INTO comercios (NombreComercio, Direcciones_IdDireccion, Vendedores_IdVendedor) VALUES (%s, %s, %s)'
            values = (data['NombreComercio'], direccion_id, seller_id)
            cursor.execute(sql_commerce, values)
            commerce_id = cursor.lastrowid

            # Insert Image
            sql_image = 'INSERT INTO comercios_multimedia (Ruta, Comercios_IdComercio) VALUES (%s, %s)'
            values = (image_url, commerce_id)
            cursor.execute(sql_image, values)
            
            conn.commit()

            return {"success": True, "message": "Vendedor creado correctamente"}, 201
        
        except mysql.connector.IntegrityError as e:
            return {"success": False, "message": f"Error de integridad de datos: {str(e)}"}, 400
    
        except mysql.connector.DatabaseError as e:
            return {"success": False, "message": f"Error de base de datos: {str(e)}"}, 500
        finally:
            cursor.close()
            conn.close()

    def get_seller_and_commerce(Usermail):
        try:
            conn, cursor = connection()
            sql = """SELECT v.IdVendedor,c.IdComercio, c.NombreComercio, v.Nombre, v.Apellidos, v.Telefono, a.rol, a.Email, cm.Ruta, d.Direccion, m.NombreMun, dep.NombreDep
            FROM comercios c
            LEFT JOIN comercios_multimedia cm ON c.IdComercio = cm.Comercios_IdComercio
            RIGHT JOIN vendedores v ON c.Vendedores_IdVendedor = v.IdVendedor
            INNER JOIN accesousuarios a ON v.AccesoUsuarios_IdAccesoUsuario = a.IdAccesoUsuario
            LEFT JOIN direcciones d ON c.Direcciones_IdDireccion = d.IdDireccion
            INNER JOIN municipios m ON d.municipios_IdMunicipio = m.IdMunicipio
            INNER JOIN departamentos dep ON d.Departamentos_IdDepartamento = dep.IdDepartamento
            WHERE a.Email = %s"""
            cursor.execute(sql, (Usermail,))
            result = cursor.fetchone()
            print('consulta', result)
            if result is not None:
                return result, 200
            else:
                return {"success": False, "message": "Comercio no encontrado"}, 404
        except Exception as e:
            return {"success": False, "message": str(e)}, 500
        finally:
            cursor.close()
            conn.close()

    def update_seller_and_commerce(IdAccesoUsuario, data, image_url):
        try:
            conn, cursor = connection()
            sql_acceso = """UPDATE accesousuarios SET Email = %s WHERE IdAccesoUsuario = %s"""
            values = (data['Email'], IdAccesoUsuario)
            cursor.execute(sql_acceso, values)

            sql_vendedor = """UPDATE vendedores SET Nombre = %s, Apellidos = %s, Telefono = %s WHERE AccesoUsuarios_IdAccesoUsuario = %s"""
            values = (data['Nombre'], data['Apellido'], data['Telefono'], IdAccesoUsuario)
            cursor.execute(sql_vendedor, values)


            # Get Departamento Id
            sql_departamento = 'SELECT IdDepartamento FROM departamentos WHERE NombreDep = %s'
            cursor.execute(sql_departamento, (data['Departamento'],))
            departamento_id = cursor.fetchone()['IdDepartamento']
            print(departamento_id, 'departamento')

            # Get Ciudad Id
            sql_ciudad = 'SELECT IdMunicipio FROM municipios WHERE NombreMun = %s'
            cursor.execute(sql_ciudad, (data['Ciudad'],))
            ciudad_id = cursor.fetchone()['IdMunicipio']
            print(ciudad_id, 'ciudad')

            sql_direccion = """UPDATE direcciones d INNER JOIN comercios c ON c.Direcciones_IdDireccion = d.IdDireccion INNER JOIN vendedores v ON v.IdVendedor = c.Vendedores_IdVendedor
                SET Direccion = %s, Departamentos_IdDepartamento = %s, municipios_IdMunicipio = %s WHERE v.AccesoUsuarios_IdAccesoUsuario = %s"""
            values = (data['Direccion'], departamento_id, ciudad_id, IdAccesoUsuario)
            cursor.execute(sql_direccion, values)

            sql_comercio = """UPDATE comercios c INNER JOIN vendedores v ON c.Vendedores_IdVendedor = v.IdVendedor 
            SET c.NombreComercio = %s WHERE v.AccesoUsuarios_IdAccesoUsuario = %s"""
            values = (data['NombreComercio'], IdAccesoUsuario)
            cursor.execute(sql_comercio, values)

            # Insert Image
            sql_image = 'UPDATE comercios_multimedia SET Ruta = %s WHERE Comercios_IdComercio = %s'
            values = (image_url, IdAccesoUsuario)
            cursor.execute(sql_image, values)

            conn.commit()

            return {'message': 'Vendedor y Comercio actualizado correctamente'}, 200
        except Exception as e:
            return {'message': str(e)}, 500
        finally:
            cursor.close()
            conn.close()

            # INVENTARIO Y RECETAS DEL VENDEDOR
    
    # Inventory
    def get_seller_inventory(Usermail):
        try:
            conn, cursor = connection()
            sql = """SELECT i.IdInventario, s.IdSemilla, s.NombreComun, i.PrecioDeVenta, u.IdUnidad, u.Unidad, im.Ruta, c.IdComercio
                    FROM Inventario i
                    INNER JOIN semillas s ON i.Semillas_IdSemilla = s.IdSemilla
                    LEFT JOIN unidadesdeventa u ON i.UnidadesDeVenta_IdUnidad = u.IdUnidad
                    LEFT JOIN inventario_multimedia im ON i.IdInventario = im.Inventario_IdInventario
                    INNER JOIN comercios c ON i.Comercios_IdComercio = c.IdComercio
                    INNER JOIN vendedores v ON c.Vendedores_IdVendedor = v.IdVendedor
                    WHERE v.AccesoUsuarios_Email = %s"""
            cursor.execute(sql, (Usermail,))
            result = cursor.fetchall()
            if result:
                return result
            else:
                return {"success": False, "message": "Inventario no encontrado"}, 404
        except Exception as e:
            return {"success": False, "message": str(e)}, 500
        finally:
            cursor.close()
            conn.close()

    def create_seller_inventory(data, image_url):
        try:
            conn, cursor = connection()
            sql_inventory = """INSERT INTO inventario (Semillas_IdSemilla, UnidadesDeVenta_IdUnidad, 
            PrecioDeVenta, Ruta, Comercios_IdComercio) values (%s, %s, %s, %s, %s)"""
            values = (data['IdSemilla'], data['UnidadDeVenta'], data['PrecioDeVenta'], image_url, data['IdComercio'])
            cursor.execute(sql_inventory, values)

            if image_url:
                sql_image = 'INSERT INTO inventario_multimedia (Ruta, Inventario_IdInventario) values (%s, %s)'
                values = (image_url, cursor.lastrowid)
                cursor.execute(sql_image, values)
            conn.commit()
            return {'message': 'Inventario creado correctamente'}, 201
        except Exception as e:
            return {"success": False, "message":str(e)}, 500
        finally:
            conn.close()
            cursor.close()
    
    def update_seller_inventory(IdInventario, data, image_url):
        try:
            conn, cursor = connection()
            sql_inventory = """UPDATE inventario SET Semillas_IdSemilla = %s, UnidadesDeVenta_IdUnidad = %s, PrecioDeVenta = %s WHERE IdInventario = %s AND Comercios_IdComercio = %s"""
            values = (data['IdSemilla'], data['UnidadDeVenta'], data['PrecioDeVenta'], IdInventario, data['IdComercio'])
            cursor.execute(sql_inventory, values)

            if image_url:
                sql_img = """UPDATE inventario_multimedia SET Ruta = %s WHERE Inventario_IdInventario = %s"""
                values = (image_url, IdInventario)
                cursor.execute(sql_img, values)
            conn.commit()
            return {'message': 'Inventario actualizado correctamente'}, 200
        except Exception as e:
            return {"success": False, "message":str(e)}, 500
        finally:
            conn.close()
            cursor.close()

    def get_seller_recipes(Usermail):
        try:
            conn, cursor = connection()
            sql_recipe = """SELECT 
        `r`.`IdReceta` AS `IdReceta`,
        `r`.`Nombre` AS `Nombre`,
        `r`.`Descripcion` AS `Descripcion`,
        COALESCE(GROUP_CONCAT(DISTINCT CONCAT(`pr`.`NumeroPaso`,
                            ': ',
                            `pr`.`Instruccion`)
                    ORDER BY `pr`.`NumeroPaso` ASC
                    SEPARATOR ' | '),
                'No se encontraron pasos') AS `Pasos`,
        COALESCE(GROUP_CONCAT(DISTINCT `s`.`IdSemilla`
                    SEPARATOR ', ')) AS `IdSemillas`,
        COALESCE(GROUP_CONCAT(DISTINCT CONCAT(`rs`.`Cantidad`,
                            ' de ',
                            `s`.`NombreComun`)
                    SEPARATOR ', '),
                'No se encontraron semillas') AS `Semillasusadas`,
        COALESCE(GROUP_CONCAT(DISTINCT `p`.`IdProductosAlter`
                    SEPARATOR ', ')) AS `IdIngredientes`,
        COALESCE(GROUP_CONCAT(DISTINCT CONCAT(`rp`.`Cantidad`, ' de ', `p`.`Producto`)
                    SEPARATOR ', '),
                'No se encontraron productos adicionales') AS `ProductosAdicionales`,
        `rm`.`Ruta` AS `Ruta`
    FROM
        `recetas` `r`
        LEFT JOIN `recetas_has_semillas` `rs` ON `r`.`IdReceta` = `rs`.`Recetas_IdReceta`
        LEFT JOIN `semillas` `s` ON `rs`.`Semillas_IdSemilla` = `s`.`IdSemilla`
        LEFT JOIN `recetas_has_productosalterrecetas` `rp` ON `r`.`IdReceta` = `rp`.`Recetas_IdReceta`
        LEFT JOIN `productosalterrecetas` `p` ON `rp`.`ProductosAlterRecetas_IdProductosAlter` = `p`.`IdProductosAlter`
        LEFT JOIN `recetas_multimedia` `rm` ON `r`.`IdReceta` = `rm`.`Recetas_IdReceta`
        LEFT JOIN `pasosrecetas` `pr` ON `r`.`IdReceta` = `pr`.`Recetas_IdReceta`
        INNER JOIN `vendedores_has_recetas` `vr` ON `r`.`IdReceta` = `vr`.`Recetas_IdReceta`
        INNER JOIN `vendedores` `v` ON `v`.`IdVendedor` = `vr`.`Vendedores_IdVendedor`
        WHERE `v`.`AccesoUsuarios_Email` = %s
    GROUP BY `rm`.`Ruta` , `r`.`IdReceta` , `r`.`Nombre` , `r`.`Descripcion`
    """
            cursor.execute(sql_recipe, (Usermail,))
            recipes = cursor.fetchall()
            if recipes:
                return recipes
            else:
                return {"success": False, "message": "No se encontraron recetas"}, 404
        except Exception as e:
            return {"success": False, "message":str(e)}, 500
        finally:
            cursor.close()