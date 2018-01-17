from src.main import app

import json

from flask import g
from flask import request

from src.models.model import Session
from src.models.model import Model
from src.models.model import SqlColumn
from jinja2 import Environment, PackageLoader, select_autoescape

env = Environment(
    loader=PackageLoader('src', 'template'),
    autoescape=select_autoescape(['temp'])
)

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
        rst.append(m.as_json(session))

    return json.dumps({"success": True, "data": rst})


@app.route("/api/model/<int:id>", methods=["get"])
def fetchModel(id):
    session = Session()
    m = session.query(Model).get(id)
    return json.dumps({"success": True, "data": m.as_json(session)})


@app.route("/api/model/<int:id>/build", methods=["get"])
def buildCode(id):
    session = Session()
    m = session.query(Model).get(id)
    cols = session.query(SqlColumn).filter(SqlColumn.model_id==id).all()
    template = env.get_template('gorm.temp')
    m = {
        "int": "int",
        "text": "string",
        "date": "time.Time",
    }
    for col in cols:
        col.name = col.name.capitalize()
        col.type = m.get(col.type, "string")
    rst = template.render(modelName='Abc', cols=cols)
    print rst
    return json.dumps({"success": True, "data": rst})
