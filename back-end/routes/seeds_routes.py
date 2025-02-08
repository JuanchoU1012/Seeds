from  flask import Blueprint, jsonify, request
from controllers.seeds_controller import SeedsController
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt, unset_jwt_cookies


SeedsRoutes = Blueprint('SeedsRoutes', __name__)

@SeedsRoutes.route('/semillas/get', methods =['GET'])
def get_seeds():
    return jsonify(SeedsController.get_image())

@SeedsRoutes.route('/semillas/create', methods =['POST'])
@jwt_required()
def create_seed():
    data = {
        'NombreCientSemilla': request.form.get('NombreCientSemilla'),
        'NombreComun': request.form.get('NombreComun'),
        'Descripcion': request.form.get('Descripcion'),
        'image_url': request.files.get('image_url')
    }
    return SeedsController.create_seed(data)


@SeedsRoutes.route('/semillas/update/<IdSemilla>', methods =['PUT'])
@jwt_required()
def update_seed(IdSemilla):
    data = request.get_json()
    return SeedsController.update_seed(IdSemilla, data)

@SeedsRoutes.route('/semillas/delete/<IdSemilla>', methods =['DELETE'])
@jwt_required()
def delete_seed(IdSemilla):
    return SeedsController.delete_seed(IdSemilla)