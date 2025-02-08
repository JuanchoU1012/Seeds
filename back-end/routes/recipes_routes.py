from flask import Blueprint, jsonify, request
from controllers.recipes_controller import RecipesController
from controllers.recipeproduct_controller import RecipeProductController
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt, unset_jwt_cookies

RecipesRoutes = Blueprint('SeedsRoutes', __name__)

@RecipesRoutes.route('/recipes/get', methods =['GET'])
def get_recipes():
    return jsonify(RecipesController.get_recipes())

@RecipesRoutes.route('/recipes/create', methods =['POST'])
@jwt_required()
def create_recipes():
    data = request.get_json()
    return RecipesController.create_recipes()

@RecipesRoutes.route('/recipes/update/<IdReceta>', methods =['PUT'])
@jwt_required()
def update_recipes(IdReceta):
    data = request.get_json()
    return RecipesController.update_recipes(IdReceta, data)

@RecipesRoutes.route('/recipes/delete/<IdReceta>', methods =['DELETE'])
@jwt_required()
def delete_recipes(IdReceta):
    return RecipesController.delete_recipes(IdReceta)

# routes for products

@RecipesRoutes.route('/products/get', methods =['GET'])
def get_products():
    return jsonify(RecipesController.get_products())

@RecipesRoutes.route('/products/create', methods =['POST'])
@jwt_required()
def create_products():
    data = request.get_json()
    return RecipesController.create_products()

@RecipesRoutes.route('/products/update/<IdProducto>', methods =['PUT'])
@jwt_required()
def update_products(IdProducto):
    data = request.get_json()
    return RecipesController.update_products(IdProducto, data)

@RecipesRoutes.route('/products/delete/<IdProducto>', methods =['DELETE'])
@jwt_required()
def delete_products(IdProducto):
    return RecipesController.delete_products(IdProducto)