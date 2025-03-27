
# import libraries

from flask import Flask, render_template
from flask_cors import CORS
from routes.user_routes import UserRoutes
from routes.seeds_routes import SeedsRoutes
from routes.recipes_routes import RecipesRoutes
from routes.sellers_routes import SellersRoutes
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
import os
from datetime import timedelta

app = Flask(__name__)

# Configure the JWT settings
load_dotenv()  # Asegúrate de cargar las variables de entorno antes de usarlas
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')


app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
jwt = JWTManager(app)

app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=60)
app.config["JWT_COOKIE_SECURE"] = True  # Ensure HTTPS
app.config["JWT_COOKIE_SAMESITE"] = "None"  # Allow cross-origin cookies
app.config['JWT_COOKIE_CSRF_PROTECT'] = False 

app.config['UPLOAD_FOLDER_SEED'] = 'static/uploads/seeds'
app.config['UPLOAD_FOLDER_RECIPE'] = 'static/uploads/recipes'
app.config['UPLOAD_FOLDER_COMMERCE'] = 'static/uploads/sellers'
app.config['UPLOAD_FOLDER_INVENTORY'] = 'static/uploads/sellers/inventory'



# Update CORS configuration
CORS(app, resources={
    r"/*": {
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "X-CSRF-TOKEN"],
        "supports_credentials": True  # ✅ Corregido
    }
})




@app.route('/')
def index():
    return "Hello, World!"

app.register_blueprint(UserRoutes)
app.register_blueprint(SeedsRoutes)
app.register_blueprint(RecipesRoutes)
app.register_blueprint(SellersRoutes)

port = int(os.getenv("PORT", 5000))  # Usa el puerto de Railway o 5000 por defecto
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port)




