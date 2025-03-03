from config.jsonencode import prepare_for_json
from models.user import Users

class UserController: 
    def create_user(data):
        return Users.create_user(data)
    
    def get_users():
            users = Users.get_users()
            if not users:
                return False
            else:
                return prepare_for_json(users)
    
    def delete_user(id):
         return Users.delete_user(id)
    
    def get_store():
        items = Users.get_store()
        if not items:
            return False
        else:
            items_with_images = []
            for item in items:
                store_data = dict(item)
                image_path = item['Ruta'] if item else None
                store_data['Ruta'] = f"/static{image_path}" if image_path else None
                items_with_images.append(store_data)
        return prepare_for_json(items_with_images)