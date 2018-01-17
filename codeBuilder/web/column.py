from codeBuilder.main import app

import json

from flask import g
from flask import request

from codeBuilder.models.model import get_session_scope
from codeBuilder.models.model import Model
from codeBuilder.models.model import SqlColumn


@app.route("/api/column/add", methods=["post"])
def addColumn():

    reqData = request.get_json()
    print reqData
    with get_session_scope() as session:

        col = SqlColumn()
        col.name = reqData.get("name", "")
        col.type = reqData.get("type", "")
        col.comment = reqData.get("comment", "")
        col.model_id = reqData.get("model_id", 0)
        session.add(col)
        session.commit()
        return json.dumps({"success": True, "data": col.as_json(session)})


@app.route("/api/column/<int:id>", methods=["put"])
def updateColumn(id):

    reqData = request.get_json()
    with get_session_scope() as session:
        col = session.query(SqlColumn).get(id)
        col.name = reqData.get("name", "")
        col.type = reqData.get("type", "")
        col.comment = reqData.get("comment", "")
        col.model_id = reqData.get("model_id", 0)
        session.add(col)
        session.commit()
        return json.dumps({"success": True, "data": col.as_json(session)})