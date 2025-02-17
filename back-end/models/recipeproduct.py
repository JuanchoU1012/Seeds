from config.connection import connection


class RecipeProduct:
    def get_products():
            conn, cursor = connection()
            try:
                query = "SELECT * from productosalterrecetas"
                cursor.execute(query)
                products = cursor.fetchall()
                return products
            except Exception as e:
                return {"success": False, "message": "Error al obtener productos"}, 500
            finally:
                conn.close()
                cursor.close()

        
    def create_recipe_product(data):
            conn, cursor = connection()
            try:
                query = "INSERT INTO productosalterrecetas (IdProducto, Producto) VALUES (%s, %s)"
                cursor.execute(query, (data['IdProducto'], data['Producto']))
                conn.commit()
                return {"success": True, "message": "Producto agregado a la receta correctamente"}, 201
            except Exception as e:
                print(e)
                return {"success": False, "message": "Error al agregar producto a la receta"}, 500

