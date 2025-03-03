from config.connection import connection
import bcrypt 


def hash_password(password):
    # Generate a salt and hash the password
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password

class Users:
    
    def create_user(data):
        conn, cursor = connection()
        try:
            hashed_password = hash_password(data['password'])
            sql = "INSERT INTO AccesoUsuarios (email, password, rol, activo) VALUES (%s, %s, %s, %s)"
            values = (data['email'], hashed_password, data['rol'], 1)
            cursor.execute(sql, values)
            conn.commit()
            return {"success": True, "message": "Usuario creado correctamente"}, 201
        except Exception as e:
            return {"success": False, "message": str(e)}, 500
        finally:
            cursor.close()
            conn.close()

    def get_users():
        conn, cursor = connection()
        try:
            sql = "SELECT * FROM AccesoUsuarios"
            cursor.execute(sql)
            users = cursor.fetchall()
            return users
        except Exception as e:
             return {"success": False, "message": str(e)}, 500
        finally:
            cursor.close()
            conn.close()

    def delete_user(data):
        cursor = connection()
        try:
            sql = "DELETE FROM AccesoUsuarios WHERE IdAccesoUsuario = %s"
            cursor.execute(sql, (data['IdAccesoUsuario'],))
            return {"success": True, "message": "Usuario eliminado correctamente"}, 200
        except Exception as e:
            return {"success": False}, 500
        
    def get_store():
        conn, cursor = connection()
        try:
            query_store = """SELECT * FROM vw_tienda"""
            cursor.execute(query_store)
            result = cursor.fetchall()
            return result
        except Exception as e:
            return {"success": False}, 500
        finally:
            cursor.close()
            conn.close()