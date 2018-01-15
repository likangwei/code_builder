from src.main import app

import json

from flask import g
from flask import request

from src.models.model import Session
from src.models.model import Model
from src.models.model import SqlColumn


@app.route("/api/column/add", methods=["post"])
def addModel():

    reqData = request.get_json()

    session = Session()

    modelId = reqData.get("model", 0)

    model = session.query(Model).get(modelId)
    col = SqlColumn()

    col.name = reqData.get("name", "")
    col.type = reqData.get("type", "")
    col.comment = reqData.get("comment", "")
    session.add(col)
    session.commit()
    return json.dumps({"success": True})