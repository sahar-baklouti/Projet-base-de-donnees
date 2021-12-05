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

commune_entries = Blueprint('Commune', __name__)


@commune_entries.route('/listCommunes/', methods=['GET'])
def list_communes():
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(f"SELECT *  FROM {Commune.table_name}")
    return jsonify(connector.fetchall())


@commune_entries.route('/totalVoiture/', methods=['GET'])
def total_voiture():
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(f"SELECT SUM(nombre_client) as total  FROM {Commune.table_name}")
    return jsonify(connector.fetchall())

@commune_entries.route('/nameCommunes/', methods=['GET'])
def name_communes():
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(f"SELECT nom_commune  FROM {Commune.table_name}")
    return jsonify(connector.fetchall())

@commune_entries.route('/deleteCommune/<nom>', methods=['DELETE'])
def delete_commune(nom):
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(f"DELETE FROM {Commune.table_name} WHERE nom_commune=?", (nom,))
    return list_communes()

@commune_entries.route('/ajouterCommune', methods=['POST'])
def ajouter_commune():
    connector = SqlConnectionManager(DATABASE_FILE)
    record = json.loads(request.data)
    Commune.check_insert(connector, record["nom_commune"].lower())

    return {}

@commune_entries.route('/getCommuneNom/<nom>', methods=['GET'])
def get_commune_by_nom(nom):
    connector = SqlConnectionManager(DATABASE_FILE)

    result = connector.select_into_data_base(Commune.table_name, {"nom_commune": nom},
                                             ["nom_commune ", "nombre_client"])
    return jsonify(result)