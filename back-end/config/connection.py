import os
import mysql.connector as mysql

db_config = {
      "host": os.environ.get("DB_HOST"),
      "port": os.environ.get("DB_PORT"),
      "user": os.environ.get("DB_USER"),
      "password": os.environ.get("DB_PASSWORD"),## perra hpta cambiele esa clave de mierda att. mamian
      "database": os.environ.get("DB_DATABASE")
}

def connection():
     try:
          conn = mysql.connect(**db_config)
          cursor = conn.cursor(dictionary=True)
          return conn, cursor
     except mysql.Error as e:
          return f"Database error: {e}", None

def close_connection(conn, cursor):
     if conn:
          conn.close()
     if cursor:
          cursor.close()
