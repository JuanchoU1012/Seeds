from config.jsonencode import prepare_for_json
from models.sellerandcommerce import sellerandcommerce

import os 
import uuid
from flask import jsonify, current_app

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 2 MB

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class SellerAndCommerceController:
    def create_seller(data):
        if not data['image_url']:
            return {"error": "No image file"}, 400
        
        if not allowed_file(data['image_url'].filename):
            return {"error": "File type not allowed"}, 400
        
        data['image_url'].seek(0, os.SEEK_END)
        file_length = data['image_url'].tell()
        if file_length > MAX_FILE_SIZE:
            return {"error": "File is too large"}, 400
        data['image_url'].seek(0)

        # Guardar el archivo
        filename = f"{uuid.uuid4().hex}_{data['image_url'].filename}"
        upload_folder = current_app.config['UPLOAD_FOLDER_COMMERCE']
        os.makedirs(upload_folder, exist_ok=True)
        file_path = os.path.join(upload_folder, filename)
        data['image_url'].save(file_path)

        image_url = f"/uploads/commerce/{filename}"
        return sellerandcommerce.create_seller_and_commerce(data, image_url)
    
    def get_sellers_and_commerces():
        return sellerandcommerce.get_sellers_and_commerces()

    def get_seller_and_commerce(Usermail):
        return sellerandcommerce.get_seller_and_commerce(Usermail)

    def update_seller_info(IdComercio, data):
        if not data['image_url']:
            return sellerandcommerce.update_seller_and_commerce(IdComercio, data, None)
        
        image = sellerandcommerce.get_seller_and_commerce(data['Email'])
        print(image)
        if image:
            file_path = os.path.join(current_app.root_path, 'static', image['Ruta'].lstrip('/'))
            print(file_path)
            if os.path.exists(file_path):
                os.remove(file_path)

        if not allowed_file(data['image_url'].filename):
            return {"error": "File type not allowed"}, 400

    # Verificar el tamaño del archivo
        data['image_url'].seek(0, os.SEEK_END)
        file_length = data['image_url'].tell()
        if file_length > MAX_FILE_SIZE:
            return {"error": "File is too large"}, 400
        data['image_url'].seek(0)

        # Generar un nombre único y guardar el archivo
        filename = f"{uuid.uuid4().hex}_{data['image_url'].filename}"
        upload_folder = current_app.config['UPLOAD_FOLDER_SEED']
        os.makedirs(upload_folder, exist_ok=True)
        file_path = os.path.join(upload_folder, filename)
        data['image_url'].save(file_path)

    # URL relativa de la imagen
        image_url = f"/uploads/seeds/{filename}"
        return sellerandcommerce.update_seller_and_commerce(IdComercio, data, image_url)

    def delete_seller_and_commerce(IdComercio):
        return sellerandcommerce.delete_seller_and_commerce(IdComercio)