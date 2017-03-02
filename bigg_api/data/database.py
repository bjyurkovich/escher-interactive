from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker

from sqlalchemy import create_engine, MetaData

from configuration.config import config

from pymongo import MongoClient

class MySQL:
	def __init__(self):
		self.engine = create_engine('mysql://{0}:{1}@{3}/{2}'.format(config['database']['username'], config['database']['password'], config['database']['database'], config['database']['host']), echo=False, convert_unicode=True, pool_recycle=3600)
		self.createSession = sessionmaker(bind=self.engine)
		# self.session = Session()

		# self.engine = create_engine('mysql://root:coleslaw@localhost:3306/'+database, convert_unicode=True)
		self.metadata = MetaData(bind=self.engine)


	def query_for_rows(self, stmt, args={}):
		conn = self.engine.connect()
		qs = conn.execute(stmt, args)
		conn.close()

		out = []
		for q in qs:
			out.append(dict(q))

		return out

	def query_insert(self, stmt, args={}):
		conn = self.engine.connect()
		qs = conn.execute(stmt, args)
		conn.close()

		out = []
		for q in qs:
			out.append(dict(q))

		return out

	def start_transaction(self):
		conn = self.engine.connect()
		qs = conn.execute('START TRANSACTION;')
		conn.close()
		return

	def end_transaction(self):
		conn = self.engine.connect()
		qs = conn.execute('COMMIT;')
		conn.close()
		return

	def printSqlArray(arr):
		out = '","'.join(arr)
		return '("' + out + '")'

class Mongo:
	def __init__(self):
		self.client = MongoClient()
		self.db = self.client[database]
