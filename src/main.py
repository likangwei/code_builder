from flask import Flask
app = Flask(__name__)

from src.web import api
from src.web import column
