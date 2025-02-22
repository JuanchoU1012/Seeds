from models.recipeproduct import RecipeProduct

class RecipeProductController:
    def get_products():
        return RecipeProduct.get_products()
    
    def create_product(data):
        return RecipeProduct.create_product(data)
    
    def delete_product(IdProducto):
        return RecipeProduct.delete_product(IdProducto)