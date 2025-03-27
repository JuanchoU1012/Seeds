import os
import mysql.connector as mysql
from dotenv import load_dotenv

print("CONEXION")
load_dotenv()
db_config = {
      "host": os.getenv("DB_HOST"),
      "port": os.getenv("DB_PORT"),
      "user": os.getenv("DB_USER"),
      "password": os.getenv("DB_PASSWORD"),## perra hpta cambiele esa clave de mierda att. mamian
      "database": os.getenv("DB_DATABASE")
}

print("db config", db_config)
def connection():
     try:
          conn = mysql.connect(**db_config)
          cursor = conn.cursor(dictionary=True)
          return conn, cursor
     except mysql.Error as e:
          error_message = f"Database error: {e}"
          print(error_message)  # Log the error message
          return error_message, None

def close_connection(conn, cursor):
     if conn:
          conn.close()
     if cursor:
          cursor.close()
