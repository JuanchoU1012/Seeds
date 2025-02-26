from flask import Blueprint, jsonify, request
from controllers.sellerandcommerce_controller import SellerAndCommerceController
from flask_jwt_extended import jwt_required, get_jwt_identity

SellersRoutes = Blueprint('SellersRoutes', __name__)

@SellersRoutes.route('/vendedores/info', methods =['POST'])
@jwt_required()
def create_seller():
    data = {
        'IdAccesoUsuario': int(request.form.get('IdAccesoUsuario')),
        'Nombre': request.form.get('Nombre'),
        'Apellido': request.form.get('Apellido'),
        'Telefono': int(request.form.get('Telefono')),
        'Correo': request.form.get('Correo'),
        'NombreComercio': request.form.get('NombreComercio'),
        'Direccion': request.form.get('Direccion'),
        'Ciudad': request.form.get('Ciudad'),
        'Departamento': request.form.get('Departamento'),
        'image_url': request.files.get('image_url')
    }
    print('controller data',data)
    return SellerAndCommerceController.create_seller(data)

@SellersRoutes.route("/vendedores/miinfo", methods=['GET'])
@jwt_required()
def get_seller_info():
    Usermail = get_jwt_identity()
    print("correo",Usermail)
    return jsonify(SellerAndCommerceController.get_seller_and_commerce(Usermail))

@SellersRoutes.route("/vendedores/info/update/<IdAccesoUsuario>", methods=['PUT'])
@jwt_required()
def update_seller_info(IdAccesoUsuario):
    print('ruta')
    data = {
        'Nombre': request.form.get('Nombre'),
        'Apellido': request.form.get('Apellido'),
        'Telefono': request.form.get('Telefono'),
        'Email': request.form.get('Correo'),
        'NombreComercio': request.form.get('NombreComercio'),
        'Direccion': request.form.get('Direccion'),
        'Ciudad': request.form.get('Ciudad'),
        'Departamento': request.form.get('Departamento'),
        'image_url': request.files.get('image_url')
    }
    print('controller data',data)
    return SellerAndCommerceController.update_seller_info(IdAccesoUsuario, data)