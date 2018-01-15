# coding: utf-8
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

some_engine = create_engine('mysql://root:root@localhost/codeBuilder?charset=utf8')
Session = sessionmaker(bind=some_engine)
session = Session()


Base = declarative_base()
metadata = Base.metadata


class SqlColumn(Base):
    __tablename__ = 'column'

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    type = Column(String(255))
    comment = Column(String(1000))
    model_id = Column(Integer)


class Model(Base):
    __tablename__ = 'model'

    id = Column(Integer, primary_key=True)
    name = Column(String(255))