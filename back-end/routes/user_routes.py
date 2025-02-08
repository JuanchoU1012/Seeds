from flask import Blueprint, jsonify, request

from controllers.user_controller import UserController
from controllers.login import login

UserRoutes = Blueprint('UserRoutes', __name__)
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt, unset_jwt_cookies


@UserRoutes.route('/registro', methods =['POST'])
def create_user():
    data = request.get_json()
    return UserController.create_user(data)

@UserRoutes.route('/login', methods =['POST'])

def login_token():
    data = request.get_json()
    return login(data)

@UserRoutes.route('/users/get', methods =['GET'])
@jwt_required()
def get_users():
    user_data = get_jwt_identity()
    if user_data:
        return jsonify(UserController.get_users())
    else:
        return jsonify({"message": "Unauthorized"}), 401

@UserRoutes.route("/users/protegida", methods=["GET"])
@jwt_required()
def protected():
    user_identity = get_jwt_identity()
    user_data = get_jwt()
    if user_identity:
        return user_data
    else:
        return jsonify({"message": "Unauthorized"}), 401

@UserRoutes.route("/logout", methods=["POST"])
@jwt_required()
def logout():
        response = jsonify({"message": "JWT cleaned"})
        unset_jwt_cookies(response)
        return response