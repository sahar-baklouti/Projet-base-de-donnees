import json
from flask import request, Blueprint, jsonify

from database import DATABASE_FILE
from database.client import Client
from database.commune import Commune
from database.forfait import Forfait
from database.intervention import Intervention
from database.sql_conection_manager import SqlConnectionManager
from database.technicien import Technicien
from database.voiture import Voiture

forfait_entries = Blueprint('forfait', __name__)


@forfait_entries.route('/listForfaits/', methods=['GET'])
def list_forfaits():
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(f"SELECT *  FROM {Forfait.table_name}")
    return jsonify(connector.fetchall())
