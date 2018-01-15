from src.main import app

import json

from flask import g
from flask import request

from src.models.model import Session
from src.models.model import Model
from src.models.model import SqlColumn


@app.route("/api/column/add", methods=["post"])
def addColumn():

    reqData = request.get_json()
    print reqData
    session = Session()

    col = SqlColumn()
    col.name = reqData.get("name", "")
    col.type = reqData.get("type", "")
    col.comment = reqData.get("comment", "")
    col.model_id = reqData.get("model_id", 0)
    session.add(col)
    session.commit()
    return json.dumps({"success": True})


@app.route("/api/column/<int:id>", methods=["put"])
def updateColumn(id):

    reqData = request.get_json()
    session = Session()
    col = session.query(SqlColumn).get(id)
    col.name = reqData.get("name", "")
    col.type = reqData.get("type", "")
    col.comment = reqData.get("comment", "")
    col.model_id = reqData.get("model_id", 0)
    session.add(col)
    session.commit()
    return json.dumps({"success": True})