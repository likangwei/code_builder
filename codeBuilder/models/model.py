# coding: utf-8
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

some_engine = create_engine('mysql://root:root@localhost/codeBuilder?charset=utf8')
Session = sessionmaker(bind=some_engine)

Base = declarative_base()
metadata = Base.metadata

from contextlib import contextmanager

@contextmanager
def get_session_scope():
    try:
        s = Session()
        yield s
        s.commit()
    except:
        s.rollback()
    finally:
        s.close()


class SqlColumn(Base):
    __tablename__ = 'column'

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    type = Column(String(255))
    comment = Column(String(1000))
    model_id = Column(Integer)

    def as_json(self, session):
        return {
            "name": self.name,
            "id": self.id,
            "type": self.type,
            "comment": self.comment,
            "model_id": self.model_id
        }

class Model(Base):
    __tablename__ = 'model'

    id = Column(Integer, primary_key=True)
    name = Column(String(255))

    def as_json(self, session):
        cols = session.query(SqlColumn).filter(SqlColumn.model_id==self.id)
        return {
            "name": self.name,
            "id": self.id,
            "cols": [col.as_json(session) for col in cols]
        }
