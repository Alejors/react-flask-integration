from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, Profile
import datetime

credentials = Blueprint('credentials', __name__)

@credentials.route('/login', methods=['POST'])
def login():
    inputtedEmail = request.json.get('email')
    inputtedPassword = request.json.get('password')

    if not inputtedEmail: return jsonify({"status": "failed", "message": "You need to input an email", "data": None}), 400
    if not inputtedPassword: return jsonify({"status": "failed", "message": "You need to input a password", "data": None}), 400

    userExists = User.query.filter_by(email = inputtedEmail).first()
    if not userExists: return jsonify({"status":"failed", "message":"Wrong email/password combination","data":None}), 401
    if not check_password_hash(userExists.password,inputtedPassword): return jsonify({"status":"failed", "message":"Wrong email/password combination","data":None}), 401

    token_expiration = datetime.timedelta(hours = 5)

    new_access_token = create_access_token(identity = userExists.id, expires_delta = token_expiration)

    loginData = {
        "access_token": new_access_token,
        "user": userExists.serialize()
    }

    return jsonify({"status":"success", "message": "Login succesful. Redirecting.", "data": loginData}), 200

@credentials.route('/register', methods=['POST'])
def register():

    inputtedEmail = request.json.get('email')
    inputtedPassword = request.json.get('password')

    inputtedName = request.json.get('name', '')
    inputtedLastname = request.json.get('lastname', '')
    inputtedUsername = request.json.get('username', '')

    if not inputtedEmail: return jsonify({"status": "failed", "message": "You need an email", "data": None}), 400
    if not inputtedPassword: return jsonify({"status": "failed", "message": "You need a password", "data": None}), 400

    userExists = User.query.filter_by(email = inputtedEmail).first()
    if userExists: return jsonify({"status":"failed", "message":"Email already registered.", "data":None}), 409

    newUser = User()
    newUser.email = inputtedEmail
    newUser.password = generate_password_hash(inputtedPassword)

    newProfile = Profile()
    newProfile.username = inputtedUsername
    newProfile.name = inputtedName
    newProfile.lastname = inputtedLastname

    newUser.profile = newProfile
    newUser.save()

    if newUser: return jsonify({"status": "success", "message": "Registration succesful. Redirecting to login.", "data": None}), 200
    else: return jsonify({"status": "failed", "message": "Error in registration, please try again.", "data": None}), 200