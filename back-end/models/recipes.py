from config.connection import connection

class Recipes:
    def get_recipes():
        conn, cursor = connection()
        try:
            query = "SELECT r.IdReceta,r.Nombre,r.Descripcion, COALESCE(GROUP_CONCAT(DISTINCT s.NombreComun SEPARATOR ', '), 'No se encontraron semillas') AS 'Semillasusadas', COALESCE(GROUP_CONCAT(DISTINCT p.Producto SEPARATOR ', '), 'No se encontraron productos adicionales') AS 'ProductosAdicionales', rm.Ruta AS 'Ruta' FROM recetas r LEFT JOIN recetas_has_semillas rs ON r.IdReceta = rs.Recetas_IdReceta LEFT JOIN semillas s ON rs.Semillas_IdSemilla = s.IdSemilla LEFT JOIN recetas_has_productosalterrecetas rp ON r.IdReceta = rp.Recetas_IdReceta LEFT JOIN productosalterrecetas p ON rp.ProductosAlterRecetas_IdProductosAlter = p.IdProductosAlter INNER JOIN recetas_multimedia rm ON r.IdReceta = rm.Recetas_IdReceta GROUP BY rm.Ruta, r.IdReceta, r.Nombre, r.Descripcion "
            cursor.execute(query)
            recipes = cursor.fetchall()
            return recipes
        except Exception as e:
            print(e)
            return {"success": False, "message": "Error al obtener recetas"}, 500
        finally:
            cursor.close()
            conn.close()

    def create_recipe(data, videourl):
        try:
            conn, cursor = connection()
            query = "INSERT INTO recetas (Nombre, Descripcion) VALUES (%s, %s)"
            cursor.execute(query, (data['Nombre'], data['Descripcion']))
            recipe_id = cursor.lastrowid
            conn.commit()
            for IdSemilla in data['Semillas']:
                query = "INSERT INTO recetas_has_semillas (Recetas_IdReceta, Semillas_IdSemilla) VALUES (%s, %s)"
                cursor.execute(query, (recipe_id, IdSemilla))
                conn.commit()
            for IdProducto in data['Ingredientes']:
                query = "INSERT INTO recetas_has_productosalterrecetas (Recetas_IdReceta, ProductosAlterRecetas_IdProductosAlter) VALUES (%s, %s)"
                cursor.execute(query, (recipe_id, IdProducto))
                conn.commit()
            if videourl:
                    query = "INSERT INTO recetas_multimedia (Ruta, Recetas_IdReceta) VALUES (%s, %s)"
                    cursor.execute(query, (videourl, recipe_id))
                    conn.commit()
            return {"success": True, "message": "Receta creada correctamente"}, 201
        except Exception as e:
            conn.rollback()
            return {"success": False, "message": str(e)}, 500
        finally:
            cursor.close()
            conn.close()

    def update_recipe(IdReceta, data):
        conn, cursor = connection()
        try:
            sql = "UPDATE recetas SET Nombre = %s, Descripcion = %s WHERE IdReceta = %s"
            values = (data['Nombre'], data['Descripcion'], IdReceta)
            cursor.execute(sql, values)
            conn.commit()
            return {"success": True, "message": "Receta actualizada correctamente"}, 200
        except Exception as e:
            conn.rollback()
            return {"success": False, "message": str(e)}, 500
        finally:
            cursor.close()
            conn.close()
    def delete_recipe(IdReceta):
            conn, cursor = connection()
            try:
                sql = "DELETE FROM recetas WHERE IdReceta = %s"
                cursor.execute(sql, (IdReceta,))
                conn.commit()
                return {"success": True, "message": "Receta eliminada correctamente"}, 200
            except Exception as e:
                conn.rollback()
                return {"success": False, "message": str(e)}, 500
    