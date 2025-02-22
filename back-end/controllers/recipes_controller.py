from models.recipes import Recipes
from models.recipeproduct import RecipeProduct
from config.jsonencode import prepare_for_json

import os
import uuid
from flask import jsonify, current_app

ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov'}
MAX_FILE_SIZE = 100 * 1024 * 1024  # 100 MB

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class RecipesController:
    def create_recipes(data):
        print("data", data)

        if not data['videourl']:
            return Recipes.create_recipe(data, None)
        
        if not allowed_file(data['videourl'].filename):
            return {"error": "File type not allowed"}, 400        
        
        # Verificar el tamaño del archivo
        data['videourl'].seek(0, os.SEEK_END)
        file_length = data['videourl'].tell()
        if file_length > MAX_FILE_SIZE:
            return {"error": "File is too large"}, 400
        data['videourl'].seek(0)

        # Guardar el archivo
        filename = f"{uuid.uuid4().hex}_{data['videourl'].filename}"
        upload_folder = current_app.config['UPLOAD_FOLDER_RECIPE']
        os.makedirs(upload_folder, exist_ok=True)
        file_path = os.path.join(upload_folder, filename)
        data['videourl'].save(file_path)

        # URL relativa del video
        videourl = f"/uploads/recipes/{filename}"
        return Recipes.create_recipe(data, videourl)
    
    def update_recipes(IdReceta, data):
        print("data controller", data)
        
        if not data['videourl']:
            return Recipes.update_recipe(IdReceta, data, None)
        
        if not allowed_file(data['videourl'].filename):
            return {"error": "File type not allowed"}, 400        
        
        video = Recipes.get_recipe(IdReceta)
        
        if video:
            file_path = os.path.join(current_app.root_path, 'static', video['Ruta'].lstrip('/'))
            print(file_path)
            if os.path.exists(file_path):
                os.remove(file_path)
    
        # Verificar el tamaño del archivo
        data['videourl'].seek(0, os.SEEK_END)
        file_length = data['videourl'].tell()
        if file_length > MAX_FILE_SIZE:
            return {"error": "File is too large"}, 400
        data['videourl'].seek(0)

        # Guardar el archivo
        filename = f"{uuid.uuid4().hex}_{data['videourl'].filename}"
        upload_folder = current_app.config['UPLOAD_FOLDER_RECIPE']
        os.makedirs(upload_folder, exist_ok=True)
        file_path = os.path.join(upload_folder, filename)
        data['videourl'].save(file_path)

        # URL relativa del video
        videourl = f"/uploads/recipes/{filename}"
        return Recipes.update_recipe(IdReceta, data, videourl)
    
    def delete_recipes(IdReceta):
        video = Recipes.get_recipe(IdReceta)
        if video:
            file_path = os.path.join(current_app.root_path, 'static', video['Ruta'].lstrip('/'))
            print(file_path)
            if os.path.exists(file_path):
                os.remove(file_path)
        return Recipes.delete_recipe(IdReceta)
    
    def get_recipes():
        recipes = Recipes.get_recipes()
        if not recipes:
            return False
        recipes_with_videos=[]
        for recipe in recipes:
            print(recipe)
            recipe_data = dict(recipe)
            video_path = recipe['Ruta'] if recipe else None
            recipe_data['videourl'] = f"/static{video_path}" if video_path else None
            recipes_with_videos.append(recipe_data)
        return prepare_for_json(recipes_with_videos)
    
    def cantidades(data):
        print("data", data)
        for recipe in data['actualizaciones']:
            print(recipe)
        return Recipes.cantidades(data['actualizaciones'])