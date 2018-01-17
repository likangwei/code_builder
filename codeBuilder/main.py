from flask import Flask
app = Flask(__name__)

from codeBuilder.web import api
from codeBuilder.web import column
