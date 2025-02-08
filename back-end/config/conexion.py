import mysql.connector
from mysql.connector import Error

class Database:
    def __init__(self):
        self.connection = None
        self.config = {
            'user': 'root',
            'password': 'megacom',
            'host': 'localhost',
            'database': 'saberesysabores'
        }

    def connect(self):
        """Establece una nueva conexión a la base de datos o la reutiliza si ya está abierta."""
        try:
            # Si no hay una conexión abierta o la conexión está cerrada, se crea una nueva
            if self.connection is None or not self.connection.is_connected():
                self.connection = mysql.connector.connect(**self.config)
        except Error as e:
            print(f"Error al conectar a la base de datos: {e}")
            self.connection = None
        return self.connection

    def close(self):
        """Cierra la conexión de manera segura."""
        if self.connection is not None and self.connection.is_connected():
            self.connection.close()
            self.connection = None
        else:
            print("La conexión ya está cerrada o no existe.")

    def reconnect(self):
        """Intentar reconectar si la conexión está cerrada."""
        if self.connection is None or not self.connection.is_connected():
            return self.connect()  # Reconectar
        return self.connection