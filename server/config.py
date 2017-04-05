import os

DEBUG = False
TOKEN_SECRET = os.environ.get('SECRET_KEY') or 'JWT_SECRET'
MYSQL_DATABASE_USER = os.environ.get('MYSQL_DATABASE_USER') or 'user'
MYSQL_DATABASE_PASSWORD = os.environ.get('MYSQL_DATABASE_PASSWORD') or 'password'
MYSQL_DATABASE_DB = os.environ.get('MYSQL_DATABASE_DB') or 'auth_example'
MYSQL_DATABASE_HOST = os.environ.get('MYSQL_DATABASE_HOST') or 'localhost'