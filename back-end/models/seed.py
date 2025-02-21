from config.connection import connection

class Seeds:
    def create_seed(data, image_url):
        print(data)
        conn, cursor = connection()
        try:
            # Insert seed data
            sql = "INSERT INTO semillas (NombreCientSemilla, NombreComun, Descripcion) VALUES (%s ,%s ,%s)"
            values = (data['NombreCientSemilla'], data['NombreComun'], data['Descripcion'])
            cursor.execute(sql, values)
            seed_id = cursor.lastrowid  
            conn.commit()

            # Insert image data if provided
            if image_url:
                sqlimage = "INSERT INTO semillas_multimedia (Ruta, Semillas_IdSemilla) VALUES (%s, %s)"
                values = (image_url, seed_id)
                cursor.execute(sqlimage, values)
                conn.commit()  

            return {"success": True, "message": "Semilla creada correctamente"}, 201

        except Exception as e:
            conn.rollback()  
            return {"success": False, "message": str(e)}, 500

        finally:
            cursor.close()
            conn.close()

    def get_seeds():
        conn, cursor = connection()
        try:
            sql = "SELECT s.*, sm.Ruta FROM semillas s INNER JOIN semillas_multimedia sm ON s.IdSemilla = sm.Semillas_IdSemilla"
            cursor.execute(sql)
            seeds = cursor.fetchall()
            return seeds
        except Exception as e:
            return {"success": False, "message": str(e)}, 500
        finally:
            cursor.close()
            conn.close()
    
    def get_seed(IdSemilla):
        conn, cursor = connection()
        try:
            sql = "SELECT s.*, sm.Ruta FROM semillas s LEFT JOIN semillas_multimedia sm ON s.IdSemilla = sm.Semillas_IdSemilla WHERE s.IdSemilla = %s"
            cursor.execute(sql, (IdSemilla,))
            seeds = cursor.fetchone()
            return seeds
        except Exception as e:
            return {"success": False, "message": str(e)}, 500
        finally:
            cursor.close()
            conn.close()
    
    def delete_seed(IdSemilla):
        conn, cursor = connection()
        try:
            sql = "DELETE FROM semillas WHERE IdSemilla = %s"
            cursor.execute(sql, (IdSemilla,))
            conn.commit()
            return {"success": True, "message": "Semilla eliminada correctamente"}, 200
        except Exception as e:
            return {"success": False, "message": str(e)}, 500
        finally:
            cursor.close()
            conn.close()

    def update_seed(IdSemilla, data, image_url):
        conn, cursor = connection()
        try:
            sql = "UPDATE semillas SET NombreCientSemilla = %s, NombreComun = %s, Descripcion = %s WHERE IdSemilla = %s"
            values = (data['NombreCientSemilla'], data['NombreComun'], data['Descripcion'], IdSemilla)
            cursor.execute(sql, values)
            conn.commit()

            if data['image_url']:
                sqlimage = "UPDATE semillas_multimedia SET Ruta = %s WHERE Semillas_IdSemilla = %s"
                values = (image_url, IdSemilla)
                cursor.execute(sqlimage, values)
                conn.commit()

            return {"success": True, "message": "Semilla actualizada correctamente"}, 200
        except Exception as e:
            return {"success": False, "message": str(e)}, 500
        finally:
            cursor.close()
            conn.close()