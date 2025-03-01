from config.jsonencode import prepare_for_json
from config.connection import connection
from config.setup_JWT_cookies import setup_JWT_cookies
from flask import jsonify
from flask_jwt_extended import create_access_token, set_access_cookies
import bcrypt

def login(data):
    email=data['Email']
    password=data['Password']
    conn, cursor = connection()
    try:
        sql = "SELECT * FROM AccesoUsuarios WHERE Email = %s"
        cursor.execute(sql, (email,))
        user = cursor.fetchone()
        if user and bcrypt.checkpw(password.encode('utf-8') , user['Password']):
            additionaldata = {
                'rol': user['Rol'],
                'IdAccesoUsuario': user['IdAccesoUsuario']
            }
            return setup_JWT_cookies(email, additionaldata)
        else:
            return {"success": False, "message": "Invalid credentials"}, 401
    except Exception as e:
        print (e)
        return {"success": False, "message": "Error during login"}, 500
    finally:
        cursor.close()
        conn.close()