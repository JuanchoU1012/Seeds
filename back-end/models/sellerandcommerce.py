from config.connection import connection

class sellerandcommerce:
    def create_seller_and_commerce(data):
        conn, cursor = connection()
        try:
            sql = 'INSERT INTO vendedores (Nombre, Apellidos, Telefono, AccesoUsuarios_IdAccesoUsuarios, AccesoUsuarios_Email) VALUES (%s, %s, %s, %s)'
            values = (data['Nombre'], data['Apellidos'], data['Telefono'], data['IdAccesoUsuario'], data['Email'])
            cursor.execute(sql, values)
            return {"success": True, "message": "Vendedor creado correctamente"}, 201
        except Exception as e:
            return {"success": False, "message": e}, 500
        finally:
            cursor.close()
            conn.close()
    def get_cities():
        conn, cursor = connection()
        try:
            sql = 'SELECT * FROM ciudades'
            cursor.execute(sql)
            cities = cursor.fetchall()
            return cities
        except Exception as e:
            return {"success": False, "message": e}, 500
        finally:
            cursor.close()
            conn.close()

    def get_departments():
        conn, cursor = connection()
        try:
            sql = 'SELECT * FROM departamentos'
            cursor.execute(sql)
            departments = cursor.fetchall()
            return departments
        except Exception as e:
            return {"success": False, "message": e}, 500
        finally:
            cursor.close()
            conn.close()
    def get_sellers_and_commerces():
        return SellerAndCommerce.get_sellers_and_commerces()

    def get_seller_and_commerce(IdComercio):
        return SellerAndCommerce.get_seller_and_commerce(IdComercio)

    def update_seller_and_commerce(IdComercio, data):
        return SellerAndCommerce.update_seller_and_commerce(IdComercio, data)

    def delete_seller_and_commerce(IdComercio):
        return SellerAndCommerce.delete_seller_and_commerce(IdComercio)