from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, Profile

private = Blueprint('private', __name__)

@private.route('/profile', methods = ['GET', 'PUT'])
@jwt_required()
def get_update_profile():
    if request.method == 'GET':
        currentId = get_jwt_identity()
        currentUser = User.query.get(currentId)
        userInfo = {
            "user": currentUser.serialize()
        }
        return jsonify({"status": "success", "message": "Profile information sent.", "data": userInfo}), 200

    if request.method == 'PUT':
        currentId = get_jwt_identity()
        currentUser = User.query.get(currentId)

        inputtedEmail = request.json.get('email')
        inputtedPassword = request.json.get('password', "")

        inputtedName = request.json.get('name')
        inputtedLastname = request.json.get('lastname')
        inputtedUsername = request.json.get('username')

        if not inputtedEmail: return jsonify({"status":"failed", "message": "Email cannot be empty.", "data": None}), 400

        userFound = User.query.filter_by(email=inputtedEmail).first()
        if userFound and userFound.id != currentId: return jsonify({"status": "failed", "message": "Email already in use.", "data": None}), 400

        if inputtedPassword != "":
            currentUser.password = generate_password_hash(inputtedPassword)

        currentUser.email = current.email if inputtedEmail is None else inputtedEmail
        currentUser.profile.name = currentUser.profile.name if inputtedName is None else inputtedName
        currentUser.profile.lastname = currentUser.profile.lastname if inputtedLastname is None else inputtedLastname
        currentUser.profile.username = currentUser.profile.username if inputtedUsername is None else inputtedUsername

        currentUser.update()

        newData = {"user": currentUser.serialize()}

        return jsonify({"status": "success", "message": "Information updated.", "data": newData}), 200