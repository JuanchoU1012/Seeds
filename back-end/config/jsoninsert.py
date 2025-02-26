from connection import connection
import json

with open('colombia.json', encoding="utf-8") as json_file:
    data = json.load(json_file)

def insertjson (json):
    try:
        conn, cursor = connection()
        contadorciudadid = 1
        for departamento in json:
            for ciudad in departamento['ciudades']:
                    contadorciudadid += 1
                    sql_city = "INSERT INTO municipios (IdMunicipio, NombreMun) VALUES (%s, %s)"
                    cursor.execute(sql_city, (contadorciudadid, ciudad ))
                    conn.commit()
    except Exception as e:
        print(e)
    finally:
            cursor.close()
            conn.close()

insertjson(data)