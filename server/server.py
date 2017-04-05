# -*- coding: utf-8 -*-
from datetime import datetime, timedelta
import os
import jwt
import json
import requests
from functools import wraps
from flask import Flask, g, request, jsonify
from flask.ext.cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from jwt import DecodeError, ExpiredSignature
from flaskext.mysql import MySQL

current_path = os.path.dirname(__file__)
client_path = os.path.abspath(os.path.join(current_path, '..', '..', 'client'))

app = Flask(__name__, static_url_path='', static_folder=client_path)
app.config.from_object('config')
CORS(app)

mysql = MySQL()
mysql.init_app(app)

f = '%Y-%m-%dT%H:%M:%S'

# https://github.com/sahat/satellizer/blob/master/examples/server/python/app.py
def create_token(_id, role):
    payload = {
        'sub': _id,
        'role': role, 
        'iat': datetime.utcnow(),
        'exp': datetime.utcnow() + timedelta(days=14)
    }
    token = jwt.encode(payload, app.config['TOKEN_SECRET'])
    return token.decode('unicode_escape')


def parse_token(req):
    token = req.headers.get('Authorization').split()[1]
    return jwt.decode(token, app.config['TOKEN_SECRET'])


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not request.headers.get('Authorization'):
            response = jsonify(message='Missing authorization header')
            response.status_code = 401
            return response

        try:
            payload = parse_token(request)
        except DecodeError:
            response = jsonify(message='Token is invalid')
            response.status_code = 401
            return response
        except ExpiredSignature:
            response = jsonify(message='Token has expired')
            response.status_code = 401
            return response

        g.user_id = payload['sub']
        g.role = payload['role']

        return f(*args, **kwargs)

    return decorated_function

def is_admin(f):
    @wraps(f)
    def decorated_function_admin(*args, **kwargs):
        if g.role != 'admin':
            response = jsonify(message='Access denied')
            response.status_code = 401
            return response

        return f(*args, **kwargs)

    return decorated_function_admin

def dictfetchall(cursor):
    desc = cursor.description
    return [dict(zip([col[0] for col in desc], row)) 
        for row in cursor.fetchall()]

querySelectUser = "select * from Users where email = %s limit 1"
@app.route('/auth/login', methods=['POST'])
def login():
    email=request.json['email']
    password = request.json['password']
    
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute(querySelectUser, [email])
    user = cursor.fetchone()
    if user is None or not check_password_hash(user[4], password):
        response = jsonify(message='Wrong email or password')
        response.status_code = 401
        return response
    else:
        token = create_token(user[0], user[5])
    
    cursor.close()
    conn.commit()
    conn.close()
    
    return jsonify(token=token)

queryCreateUser = "insert into Users(name, surname, email, password, role) values (%s, %s, %s, %s, %s);"
@app.route('/auth/signup', methods=['POST'])
def signup():
    email=request.json['email']
    password=request.json['passwordGroup']['password']

    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute(querySelectUser, [email])
    data = cursor.fetchone()
    if data is not None:
        response = jsonify(message='This email is already taken')
        response.status_code = 401
        return response
    else:
        cursor.execute(queryCreateUser, [request.json['nameGroup']['firstName'], request.json['nameGroup']['lastName'], email, generate_password_hash(password), "user"])
    
    cursor.close()
    conn.commit()
    conn.close()
    
    return jsonify(message="Registration completed successfully. Now you can login to your account")

querySelectAllUsers = 'select email,name,surname from Users'
@app.route('/api/admin/users')
@login_required
@is_admin
def getAllUsers():
    conn = mysql.connect()
    cursor = conn.cursor()

    cursor.execute(querySelectAllUsers)
    users = dictfetchall(cursor)
    cursor.close()
    conn.commit()
    conn.close()

    return jsonify(users=users)

queryPersonalData = 'select email,name,surname from Users where id = %s limit 1;'
@app.route('/api/me')
@login_required
def getUser():
    conn = mysql.connect()
    cursor = conn.cursor()

    cursor.execute(queryPersonalData, [g.user_id])
    user = dictfetchall(cursor)
    cursor.close()
    conn.commit()
    conn.close()

    return jsonify(users=user)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001)
