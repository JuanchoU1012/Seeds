from flask_jwt_extended import create_access_token, set_access_cookies
from flask import jsonify


def setup_JWT_cookies(email, additionaldata):
    response = jsonify({"success": True,  "message": "Login successful", "rol": additionaldata['rol']})
    additional_claims = {
        'rol':additionaldata['rol'],
        'IdAccesoUsuario': additionaldata['IdAccesoUsuario']
    }
    print(additional_claims)

    access_token = create_access_token(identity=email, additional_claims=additional_claims)
    set_access_cookies(response, access_token)
    return response