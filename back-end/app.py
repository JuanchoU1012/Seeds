"""
This module sets up a Flask web application and connects to a MySQL database.

The `connection()` function establishes a connection to the MySQL database using the configuration stored in the `db_config` dictionary. It returns the connection object and a cursor object.

The `index()` function is a route handler that retrieves all the users from the `usuarios` table in the database and renders them in the `index.html` template.

The application is run in debug mode when the script is executed directly.
"""
# import libraries

from flask import Flask, render_template
from flask_cors import CORS
from routes.user_routes import UserRoutes
from routes.seeds_routes import SeedsRoutes
from routes.recipes_routes import RecipesRoutes

from flask_jwt_extended import JWTManager
import os
from datetime import timedelta

app = Flask(__name__)

# Configure the JWT settings
JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
jwt = JWTManager(app)

app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=60)
app.config["JWT_COOKIE_SECURE"] = True
app.config['JWT_COOKIE_CSRF_PROTECT'] = True 

app.config['UPLOAD_FOLDER'] = 'static/uploads/seeds'



# Update CORS configuration
CORS(app, resources={
    r"/*": {  # Your React app's URL
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Added OPTIONS
        "allow_headers": ["Content-Type", "X-CSRF-TOKEN"],
        "supports_credentials": True  # Enable if you're using cookies/credentials
    }

})




@app.route('/')
def index():
    return "Hello, World!"

app.register_blueprint(UserRoutes)
app.register_blueprint(SeedsRoutes)
app.register_blueprint(RecipesRoutes)


if __name__ == '__main__':
    app.run(debug=True)



