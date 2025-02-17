from models.recipes import Recipes
from models.recipeproduct import RecipeProduct

class RecipesController:
    def get_recipes():
        return Recipes.get_recipes()
    
    def create_recipes(data):
        return Recipes.create_recipe(data)
    
    def update_recipes(IdReceta, data):
        return Recipes.update_recipe(IdReceta, data)

    def delete_recipes(IdReceta):
        return Recipes.delete_recipe(IdReceta)