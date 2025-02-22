import mysql.connector as mysql

db_config = {
      "user": "root",
      "password": "",
      "host": "localhost",
      "database": "saberesysabores"
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
