from config.connection import connection


class RecipeProduct:
    def get_products():
        cursor, conn = connection()
        query = "SELECT * from productosalterrecetas"
        cursor.execute(query)
        conn.commit()
        products = cursor.fetchall()
        return products
    
    def create_recipe_product(data):
        try:
            cursor, conn = connection()
            query = "INSERT INTO productosalterrecetas (IdProducto, Producto) VALUES (%s, %s)"
            cursor.execute(query, (data['IdProducto'], data['Producto']))
            conn.commit()
            return {"success": True, "message": "Producto agregado a la receta correctamente"}, 201
        except Exception as e:
            print(e)
            return {"success": False, "message": "Error al agregar producto a la receta"}, 500

