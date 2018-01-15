from src.main import app

import json

from flask import g
from flask import request

from src.models.model import Session
from src.models.model import Model
from src.models.model import Column


@app.route("/")
def hello():
    return "Hello World!"


@app.route("/api/model/add", methods=["post"])
def addModel():

    reqData = request.get_json()

    session = Session()

    model = Model()
    model.name = reqData.get("name", "null")
    session.add(model)
    session.commit()
    return json.dumps({"success": True})


@app.route("/api/model/", methods=["get"])
def getModelList():
    session = Session()
    models = session.query(Model).all()
    rst = []
    for m in models:
        rst.append(m.as_json())

    return json.dumps({"success": True, "data": rst})


@app.route("/api/model/<int:id>", methods=["get"])
def fetchModel(id):
    session = Session()
    m = session.query(Model).get(id)
    return json.dumps({"success": True, "data": m.as_json(session)})
