from flask import Flask
from flask_restful import Resource, Api, reqparse, request

from routes.reactions import GetReaction, GetMetabolite
from flask_cors import CORS, cross_origin

from configuration.config import config

app = Flask(__name__)
api = Api(app)

CORS(app)

api.add_resource(GetReaction, '/bigg/reactions/<string:reactionName>')
api.add_resource(GetMetabolite, '/bigg/metabolites/<string:metaboliteName>')

if __name__ == '__main__':
	app.run(debug=True, port=config['port'], threaded=True, host='0.0.0.0')
