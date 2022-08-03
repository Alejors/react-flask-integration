from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from models import db
from routes.credentials import credentials
from routes.private import private

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['ENV'] = 'development'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///swapi.db'
app.config['JWT_SECRET_KEY'] = 'b6eb29bd247c236fd94718ad4f5f9eb1'
app.config['JSON_SORT_KEYS'] = False

db.init_app(app)
Migrate(app, db)
jwt = JWTManager(app)
CORS(app)

app.register_blueprint(credentials, url_prefix='/api')
app.register_blueprint(private, url_prefix='/api')

@app.route('/')
def home():
    return """
    <h1>Welcome to Alejo's Starwars-API</h1>
    """, 200

if __name__ == '__main__':
    app.run()