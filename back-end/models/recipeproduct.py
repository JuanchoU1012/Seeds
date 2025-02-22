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

        
    def create_product(data):
            conn, cursor = connection()
            try:
                query = "INSERT INTO productosalterrecetas (Producto) VALUES  (%s)"
                cursor.execute(query, (data['Nombre'], ))
                conn.commit()
                return {"success": True, "message": "Producto agregado correctamente"}, 201
            except Exception as e:
                print(e)
                return {"success": False, "message": "Error al agregar producto a la receta"}, 500
            finally:
                conn.close()
                cursor.close()
    def delete_product(IdProducto):
            conn, cursor = connection()
            try:
                query = "DELETE FROM productosalterrecetas WHERE IdProductosAlter = %s"
                cursor.execute(query, (IdProducto,))
                conn.commit()
                return {"success": True, "message": "Producto eliminado correctamente"}, 200
            except Exception as e:
                return {"success": False, "message": "Error al eliminar producto de la receta"}, 500
            finally:
                conn.close()
                cursor.close()