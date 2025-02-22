from config.connection import connection

class Recipes:
    def get_recipes():
        conn, cursor = connection()
        try:
            query = "SELECT * FROM vw_recetas"
            cursor.execute(query)
            recipes = cursor.fetchall()
            print(recipes)
            return recipes
        except Exception as e:
            print(e)
            return {"success": False, "message": "Error al obtener recetas"}, 500
        finally:
            cursor.close()
            conn.close()


    def get_recipe(IdReceta):
        conn, cursor = connection()
        try:
            query = "SELECT r.IdReceta,r.Nombre,r.Descripcion, COALESCE(GROUP_CONCAT(DISTINCT CONCAT(pr.NumeroPaso, ': ', pr.Instruccion) ORDER BY pr.NumeroPaso SEPARATOR ' | '), 'No se encontraron pasos') AS 'Pasos', COALESCE(GROUP_CONCAT(DISTINCT s.IdSemilla SEPARATOR ', ')) AS 'IdSemillas', COALESCE(GROUP_CONCAT(DISTINCT s.NombreComun SEPARATOR ', '), 'No se encontraron semillas') AS 'Semillasusadas', COALESCE(GROUP_CONCAT(DISTINCT p.IdProductosAlter SEPARATOR ', ')) AS 'IdIngredientes', COALESCE(GROUP_CONCAT(DISTINCT p.Producto SEPARATOR ', '), 'No se encontraron productos adicionales') AS 'ProductosAdicionales', rm.Ruta AS 'Ruta' FROM recetas r LEFT JOIN recetas_has_semillas rs ON r.IdReceta = rs.Recetas_IdReceta LEFT JOIN semillas s ON rs.Semillas_IdSemilla = s.IdSemilla LEFT JOIN recetas_has_productosalterrecetas rp ON r.IdReceta = rp.Recetas_IdReceta LEFT JOIN productosalterrecetas p ON rp.ProductosAlterRecetas_IdProductosAlter = p.IdProductosAlter INNER JOIN recetas_multimedia rm ON r.IdReceta = rm.Recetas_IdReceta INNER JOIN pasosrecetas pr ON r.IdReceta = pr.Recetas_IdReceta WHERE r.IdReceta = %s GROUP BY rm.Ruta, r.IdReceta, r.Nombre, r.Descripcion"
            cursor.execute(query, (IdReceta,))
            recipes = cursor.fetchone()
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

                Numeropaso = 0
            for paso in data['Pasos']:
                    Numeropaso += 1
                    query = "INSERT INTO pasosrecetas (NumeroPaso, Instruccion, Recetas_IdReceta) VALUES (%s, %s, %s)"
                    cursor.execute(query, (Numeropaso, paso, recipe_id))
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

    def update_recipe(IdReceta, data, videourl):
        try:
            
            conn, cursor = connection()
            # Validar que el diccionario `data` tenga las claves necesarias
            required_keys = {"Semillas", "Ingredientes", "Pasos", "Nombre", "Descripcion"}
            if not required_keys.issubset(data.keys()):
                return {"success": False, "message": "Datos incompletos"}, 400

            # Obtener datos actuales de la receta
            cursor.execute("SELECT Semillas_IdSemilla FROM recetas_has_semillas WHERE Recetas_IdReceta = %s", (IdReceta,))
            current_seeds = cursor.fetchall()  
            current_seeds = set([seed['Semillas_IdSemilla'] for seed in current_seeds])
            print(current_seeds, 'seeds')

            cursor.execute("SELECT ProductosAlterRecetas_IdProductosAlter FROM recetas_has_productosalterrecetas WHERE Recetas_IdReceta = %s", (IdReceta,))
            current_ingredients = cursor.fetchall()
            current_ingredients = set([ingredient['ProductosAlterRecetas_IdProductosAlter'] for ingredient in current_ingredients])
            print(current_ingredients, 'ingre')

            cursor.execute("SELECT Instruccion FROM pasosrecetas WHERE Recetas_IdReceta = %s", (IdReceta,))
            current_steps = cursor.fetchall()
            current_steps = [step['Instruccion'] for step in current_steps]
            print(current_steps, "steps")

            # Convertir nuevos valores a sets y diccionario
            new_seeds = set([int(i) for i in data['Semillas']])
            print(new_seeds, 'new seeds')
            
            new_ingredients = set([int(i) for i in data['Ingredientes']])
            print(new_ingredients, 'new ingre')

            new_steps = [step for step in data['Pasos']]
            print(new_steps, 'new steps')

            # Determinar cambios
            seeds_to_add = new_seeds - current_seeds
            print(seeds_to_add, 'seeds to add')

            seeds_to_remove = current_seeds - new_seeds
            print(seeds_to_remove, 'seeds to remove')
            for seed in seeds_to_remove:
                print(seed, "semilla a remover")

            ingredients_to_add = new_ingredients - current_ingredients
            print(ingredients_to_add, 'ingredients to add')

            ingredients_to_remove = current_ingredients - new_ingredients
            print(ingredients_to_remove, 'ingredients to remove')
            
            steps_to_remove = {}
            for i, step in enumerate(current_steps):
                print(step, "step")
                if str(step) not in new_steps:
                    print(i, "i")
                    steps_to_remove[i+1] = step
            print(steps_to_remove, 'steps to remove')

            steps_to_add = {}
            for i, step in enumerate(new_steps):
                print(step, "step")
                if not current_steps or str(step) not in current_steps:
                    steps_to_add[i+1] = step
            print(steps_to_add, ' steps to add')

            # Operaciones en batch para mayor eficiencia
            if seeds_to_add:
                cursor.executemany("INSERT INTO recetas_has_semillas (Recetas_IdReceta, Semillas_IdSemilla) VALUES (%s, %s)", 
                                   [(IdReceta, seed) for seed in seeds_to_add])
                conn.commit()
                print("seeds added")

            if seeds_to_remove:
                for seed in seeds_to_remove:
                    print(seed, "semilla a remover")
                    cursor.execute("DELETE FROM recetas_has_semillas WHERE Recetas_IdReceta = %s AND Semillas_IdSemilla = %s", (IdReceta, seed))
                    conn.commit()
                print("seeds removed")

            if ingredients_to_add:
                cursor.executemany("INSERT INTO recetas_has_productosalterrecetas (Recetas_IdReceta, ProductosAlterRecetas_IdProductosAlter) VALUES (%s, %s)", 
                                   [(IdReceta, ingredient) for ingredient in ingredients_to_add])
                conn.commit()
                print("ingredients added")

            if ingredients_to_remove:
                for ingredient in ingredients_to_remove:
                    print(ingredient, "ingredient to remove")
                    cursor.execute("DELETE FROM recetas_has_productosalterrecetas WHERE Recetas_IdReceta = %s AND ProductosAlterRecetas_IdProductosAlter = %s", (IdReceta, ingredient))
                    print("ingredients removed")

            if steps_to_remove:
                for step in steps_to_remove:
                    cursor.execute("DELETE FROM pasosrecetas WHERE Recetas_IdReceta = %s AND NumeroPaso = %s", (IdReceta, step))
                    print("steps removed")
            
            if steps_to_add:
                for step in steps_to_add:
                    cursor.execute("INSERT INTO pasosrecetas (Recetas_IdReceta, NumeroPaso, Instruccion) VALUES (%s, %s, %s)", (IdReceta, step, steps_to_add[step]))
                    conn.commit()
                    print("steps added")
            

            # Actualizar la receta
            cursor.execute("UPDATE recetas SET Nombre = %s, Descripcion = %s WHERE IdReceta = %s", 
                           (data['Nombre'], data['Descripcion'], IdReceta))
            conn.commit()
            print("receta actualizada")

            # Manejo del video
            cursor.execute("SELECT Ruta FROM recetas_multimedia WHERE Recetas_IdReceta = %s", (IdReceta,))
            video_exists = cursor.fetchone()

            if videourl:
                if video_exists and video_exists['Ruta']!= videourl:
                    cursor.execute("UPDATE recetas_multimedia SET Ruta = %s WHERE Recetas_IdReceta = %s", (videourl, IdReceta))
                    conn.commit()
                    print("video actualizado")
                else:
                    cursor.execute("INSERT INTO recetas_multimedia (Ruta, Recetas_IdReceta) VALUES (%s, %s)", (videourl, IdReceta))
                    conn.commit()
                    print("video agregado")

            print("semilla con data")
            # Confirmar cambios
            return {"success": True, "message": "Receta actualizada correctamente"}, 200

        except Exception as e:
            conn.rollback()
            return {"success": False, "message": str(e)}, 400

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
    