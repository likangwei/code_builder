#coding=utf8

from jinja2 import Environment, PackageLoader, select_autoescape

from codeBuilder.models.model import get_session_scope
from codeBuilder.models.model import SqlColumn
from codeBuilder.models.model import Model


env = Environment(
    loader=PackageLoader('codeBuilder', 'template'),
    autoescape=select_autoescape(['temp'])
)

class CodeBuilder(object):

    @classmethod
    def buildGormModel(cls, model):
        with get_session_scope() as session:
            cols = session.query(SqlColumn).filter(SqlColumn.model_id == model.id).all()
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
            return rst

    @classmethod
    def buildGinApi(cls, model):
        with get_session_scope() as session:
            cols = session.query(SqlColumn).filter(SqlColumn.model_id == model.id).all()
            template = env.get_template('gin_api.temp')
            m = {
                "int": "int",
                "text": "string",
                "date": "time.Time",
            }
            for col in cols:
                col.name = col.name.capitalize()
                col.type = m.get(col.type, "string")

            rst = template.render(modelName=model.name,
                                  objName=model.name)
            return rst