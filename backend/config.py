from datetime import timedelta
from sqlalchemy import *

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlitecloud://cf5em6kdnz.g1.sqlite.cloud:8860/chinook.sqlite?apikey=mqomFWcq7RkkPJOzaAWAyhLUQl3P1LGaMNYmXpieb90'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'your-secret-key'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
