from config.jsonencode import prepare_for_json
from models.seed import Seeds

import os
import uuid
from flask import jsonify, current_app


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class SeedsController():
    def create_seed(data):
        print('data controller', data)
        if not data['image_url']:
            return {"error": "No image file"}, 400
        
        if data['image_url'].filename == '':
            return {"error": "No selected file"}, 400

        if not allowed_file(data['image_url'].filename):
            return {"error": "File type not allowed"}, 400

    # Verificar el tamaño del archivo
        data['image_url'].seek(0, os.SEEK_END)
        file_length = data['image_url'].tell()
        if file_length > MAX_FILE_SIZE:
            return {"error": "File is too large"}, 400
        data['image_url'].seek(0)

        # Guardar el archivo
        filename = f"{data['image_url'].filename}"
        upload_folder = current_app.config['UPLOAD_FOLDER_SEED']
        os.makedirs(upload_folder, exist_ok=True)
        file_path = os.path.join(upload_folder, filename)
        data['image_url'].save(file_path)

    # URL relativa de la imagen
        image_url = f"/uploads/seeds/{filename}"
        return Seeds.create_seed(data, image_url)
    
    def get_image():
        seeds = Seeds.get_seeds()
        if not seeds:
            return False
        seeds_with_images = []
        for seed in seeds:
            seed_data = dict(seed)
        # Construct the full static URL path
            image_path = seed['Ruta'] if seed else None
            seed_data['image_url'] = f"/static{image_path}" if image_path else None
            seeds_with_images.append(seed_data)
        return prepare_for_json(seeds_with_images)

    def delete_seed(IdSemilla):
        image = Seeds.get_seed(IdSemilla)
        print(image)
        if image:
            file_path = os.path.join(current_app.root_path, 'static', image['Ruta'].lstrip('/'))
            print(file_path)
            if os.path.exists(file_path):
                os.remove(file_path)
        return Seeds.delete_seed(IdSemilla)
    
    
    def update_seed(IdSemilla, data):
        if not data['image_url']:
            return Seeds.update_seed(IdSemilla, data, None)
        
        image = Seeds.get_seed(IdSemilla)
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
        return Seeds.update_seed(IdSemilla, data, image_url)