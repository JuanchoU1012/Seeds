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