from flask import Blueprint, jsonify, request
from controllers.recipes_controller import RecipesController
from controllers.recipeproduct_controller import RecipeProductController
# from controllers.recipeproduct_controller import RecipeProductController
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt, unset_jwt_cookies

RecipesRoutes = Blueprint('RecipesRoutes', __name__)

@RecipesRoutes.route('/recipes/get', methods =['GET'])
def get_recipes():
    return jsonify(RecipesController.get_recipes())

@RecipesRoutes.route('/recipes/create', methods =['POST'])
@jwt_required()
def create_recipes():
    data = {
        'Nombre': request.form.get('Nombre'),
        'Descripcion': request.form.get('Descripcion'),
        'Semillas':  request.form.getlist('IdSemilla'),
        'Ingredientes': request.form.getlist('IdIngrediente'),
        'videourl': request.files.get('videourl'),
        'Pasos': request.form.getlist('Paso')
    }
    print("dataroute", data)
    return RecipesController.create_recipes(data)

@RecipesRoutes.route('/recipes/update/<IdReceta>', methods =['PUT'])
@jwt_required()
def update_recipes(IdReceta):
    data = {
        'Nombre': request.form.get('Nombre'),
        'Descripcion': request.form.get('Descripcion'),
        'Semillas':  request.form.getlist('IdSemilla'),
        'Ingredientes': request.form.getlist('IdIngrediente'),
        'videourl': request.files.get('videourl'),
        'Pasos': request.form.getlist('Paso')
    }
    # print("dataroute", data)
    return RecipesController.update_recipes(IdReceta, data)

@RecipesRoutes.route('/recipes/delete/<IdReceta>', methods =['DELETE'])
@jwt_required()
def delete_recipes(IdReceta):
    return RecipesController.delete_recipes(IdReceta)

# routes for products

@RecipesRoutes.route('/products/get', methods =['GET'])
def get_products():
    return jsonify(RecipeProductController.get_products())

@RecipesRoutes.route('/products/create', methods =['POST'])
@jwt_required()
def create_products():
    data = request.get_json()
    return RecipesController.create_products()