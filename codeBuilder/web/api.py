from codeBuilder.main import app

import json

from flask import g
from flask import request

from codeBuilder.models.model import get_session_scope
from codeBuilder.models.model import Model
from codeBuilder.models.model import SqlColumn
from flask import g
from codeBuilder.builders.code_builder import CodeBuilder

@app.route("/")
def hello():
    return "Hello World!"


@app.route("/api/model/add", methods=["post"])
def addModel():

    reqData = request.get_json()

    with get_session_scope() as session:

        model = Model()
        model.name = reqData.get("name", "null")
        session.add(model)
        session.commit()
        return json.dumps({"success": True})


@app.route("/api/model/", methods=["get"])
def getModelList():
    with get_session_scope() as session:
        models = session.query(Model).all()
        rst = []
        for m in models:
            rst.append(m.as_json(session))

        return json.dumps({"success": True, "data": rst})


@app.route("/api/model/<int:id>", methods=["get", "put"])
def fetchModel(id):
    if request.method == "GET":
        with get_session_scope() as session:
            m = session.query(Model).get(id)
            return json.dumps({"success": True, "data": m.as_json(session)})
    if request.method == "PUT":
        with get_session_scope() as session:
            data = request.json
            m = session.query(Model).get(id)
            m.name = data.get("name")
            session.add(m)
            session.commit()
            return json.dumps({"success": True, "data": m.as_json(session)})


@app.route("/api/model/<int:id>/build", methods=["get"])
def buildCode(id):
    with get_session_scope() as session:
        m = session.query(Model).get(id)
        ginApi = CodeBuilder.buildGinApi(m)
        gormModel = CodeBuilder.buildGormModel(m)
        data = {
            "ginApi": ginApi,
            "gormModel": gormModel,
        }
        return json.dumps({"success": True, "data": data})
