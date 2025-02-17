from models.recipeproduct import RecipeProduct

class RecipeProductController:
    def get_products():
        return RecipeProduct.get_products()