from flask import Blueprint, jsonify, request
from controllers.sellerandcommerce_controller import SellerAndCommerceController
from flask_jwt_extended import jwt_required

SellersRoutes = Blueprint('SellersRoutes', __name__)

@SellersRoutes.route('/vendedores/create', methods =['POST'])
@jwt_required()
def create_seller():
    data = {
        'Nombre': request.form.get('Nombre'),
        'Apellido': request.form.get('Apellido'),
        'Correo': request.form.get('Correo'),
        'Telefono': request.form.get('Telefono'),
        'Direccion': request.form.get('Direccion'),
        'Ciudad': request.form.get('Ciudad'),
        'Departamento': request.form.get('Departamento'),
        'image_url': request.files.get('image_url')
    }
    print('controller data',data)
    return SellerAndCommerceController.create_seller(data)

@SellersRoutes.route("/cities/get", methods=['GET'])
@jwt_required()
def get_cities():
    return jsonify(SellerAndCommerceController.get_cities())

@SellersRoutes.route("/departments/get", methods=['GET'])
@jwt_required()
def get_departments():
    return jsonify(SellerAndCommerceController.get_departments())